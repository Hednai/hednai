// ============================================
// features/contact/contact.route.ts
// Routes pour le formulaire de contact
// Pattern : ProfMatchAI (Route dans chaque feature)
// ============================================
import { Router } from "express";
import { submitContact } from "./contact.controller";

const contactRouter = Router();

// POST /api/contact — recevoir un message
contactRouter.post("/", submitContact);

export { contactRouter };