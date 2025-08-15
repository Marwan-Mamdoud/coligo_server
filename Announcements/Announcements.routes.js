import { Router } from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
} from "./Announcements.controller.js";
const router = Router();

// CRUD routes
router.get("/", getAllAnnouncements);
router.get("/:id", getAnnouncementById);
router.post("/", createAnnouncement);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
