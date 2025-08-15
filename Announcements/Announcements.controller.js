import Announcement from "./Announcements.model.js";

// GET all announcements
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (err) {
    next(err);
  }
};

// GET single announcement by ID
export const getAnnouncementById = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) throw new Error("Announcement Not found");
    return res.json({ data: announcement, success: true });
  } catch (err) {
    next(err);
  }
};

// CREATE new announcement
export const createAnnouncement = async (req, res, next) => {
  try {
    const { description, category } = req.body;
    const newAnnouncement = new Announcement({ description, category });
    await newAnnouncement.save();
    return res.status(201).json({
      message: "Created successfully",
      success: true,
      data: newAnnouncement,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE announcement by ID
export const updateAnnouncement = async (req, res, next) => {
  try {
    const { description, category } = req.body;
    const updated = await Announcement.findById(req.params.id);
    if (!updated) throw new Error("Announcement Not found");
    updated.description = description || updated.description;
    updated.category = category || updated.category;
    await updated.save();
    return res.json({
      message: "Updated successfully",
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE announcement by ID
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) throw new Error("Announcement Not found");
    res.json({ message: "Deleted successfully", success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};
