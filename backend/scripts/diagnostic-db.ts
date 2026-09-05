// ============================================
// scripts/diagnostic-db.ts
// Diagnostic de la connexion PostgreSQL.
//
// A lancer quand le widget affiche "API degradee" :
//   npm run diag:db
//
// Il teste chaque etape separement pour identifier PRECISEMENT ce qui bloque,
// au lieu du message generique de Prisma.
// ============================================
import "dotenv/config";
import net from "node:net";
import dns from "node:dns/promises";
// Prisma 7 : le client est genere dans src/generated/prisma (voir le bloc
// "generator client" de prisma/schema.prisma), pas dans @prisma/client
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Informations extraites de l'URL de connexion
interface CibleBase {
  hote: string;
  port: number;
  base: string;
  sslmode: string | null;
}

// Affiche l'URL sans jamais reveler le mot de passe
function urlMasquee(u: string): string {
  return u.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:***@");
}

// Etape 2 : analyser l'URL. Sortie du programme si elle est invalide,
// ce qui garantit au compilateur que le retour est toujours defini.
function analyserUrl(url: string): CibleBase {
  try {
    const u = new URL(url);
    return {
      hote: u.hostname,
      port: Number(u.port) || 5432,
      base: u.pathname.slice(1),
      sslmode: u.searchParams.get("sslmode"),
    };
  } catch {
    console.error("ECHEC 2/5 : DATABASE_URL n'est pas une URL valide.");
    process.exit(1);
  }
}

// Etape 4 : tester l'ouverture d'une connexion TCP brute
function testerPortTcp(hote: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: hote, port, timeout: 8000 });

    socket.on("connect", () => {
      console.log(`OK 4/5 : port ${port} accessible\n`);
      socket.destroy();
      resolve();
    });

    socket.on("timeout", () => {
      console.error(`ECHEC 4/5 : delai depasse sur ${hote}:${port}.`);
      console.error("  -> Instance endormie, pare-feu, ou reseau bloquant le port.");
      socket.destroy();
      process.exit(1);
    });

    socket.on("error", (err: Error) => {
      console.error(`ECHEC 4/5 : connexion TCP refusee sur ${hote}:${port}.`);
      console.error("  Detail :", err.message);
      process.exit(1);
    });
  });
}

async function main(): Promise<void> {
  console.log("=== Diagnostic PostgreSQL ===\n");

  // --- Etape 1 : la variable existe-t-elle ? ---
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("ECHEC 1/5 : DATABASE_URL est absente de l'environnement.");
    console.error("  -> Verifie que backend/.env existe et contient DATABASE_URL.");
    process.exit(1);
  }
  console.log("OK 1/5 : DATABASE_URL presente");
  console.log("  " + urlMasquee(url) + "\n");

  // --- Etape 2 : l'URL est-elle analysable, et le SSL est-il demande ? ---
  const cible = analyserUrl(url);
  console.log("OK 2/5 : URL valide");
  console.log(`  hote : ${cible.hote}`);
  console.log(`  port : ${cible.port}`);
  console.log(`  base : ${cible.base}`);

  // Render exige SSL pour les connexions venant de l'exterieur de son reseau
  if (cible.hote.includes("render.com") && cible.sslmode !== "require") {
    console.log("  ATTENTION : hote Render sans ?sslmode=require dans l'URL.");
    console.log("    C'est la cause la plus frequente d'echec depuis un poste local.");
  }
  console.log("");

  // --- Etape 3 : le nom d'hote se resout-il ? ---
  try {
    const adresses = await dns.lookup(cible.hote, { all: true });
    console.log("OK 3/5 : DNS resolu");
    // Le type LookupAddress vit dans "node:dns", pas dans "node:dns/promises"
    adresses.forEach((a: { address: string }) => console.log(`  ${a.address}`));
    console.log("");
  } catch (err) {
    console.error("ECHEC 3/5 : le nom d'hote ne se resout pas.");
    console.error("  -> L'instance a peut-etre ete supprimee, ou tu es hors ligne.");
    console.error("  Detail :", err instanceof Error ? err.message : err);
    process.exit(1);
  }

  // --- Etape 4 : le port TCP est-il ouvert ? ---
  await testerPortTcp(cible.hote, cible.port);

  // --- Etape 5 : Prisma peut-il executer une requete ? ---
  // Meme construction que src/lib/prisma.ts : Prisma 7 exige un adaptateur
  const adapter = new PrismaPg({ connectionString: url });
  const prisma = new PrismaClient({ adapter });

  try {
    const debut = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    console.log(`OK 5/5 : requete Prisma reussie (${Date.now() - debut} ms)`);
    console.log("\n=== La base est joignable. ===");
    console.log('Le widget doit afficher "API en ligne" au prochain rafraichissement.');
  } catch (err) {
    console.error("ECHEC 5/5 : Prisma n'arrive pas a interroger la base.");
    console.error("  Detail :", err instanceof Error ? err.message : err);
    console.error("\n  Causes frequentes :");
    console.error("   - mot de passe change ou expire (Render fait tourner les identifiants)");
    console.error("   - ?sslmode=require manquant dans l'URL");
    console.error("   - base supprimee (les instances PostgreSQL gratuites Render expirent)");
    console.error("   - migrations non appliquees : npx prisma migrate deploy");
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();