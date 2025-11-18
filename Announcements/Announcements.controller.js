import {
  createAnnouncementService,
  deleteAnnouncementService,
  getAllAnnouncementsService,
  getAnnouncementByIdService,
  updateAnnouncementService,
} from "./Announcements.service.js";

// GET all announcements
export const getAllAnnouncements = async (req, res, next) => {
  try {
    // Fetch announcements using service
    const announcements = await getAllAnnouncementsService();

    // Return response
    return res.json({ success: true, data: announcements });
  } catch (err) {
    next(err);
  }
};

// GET single announcement by ID
export const getAnnouncementById = async (req, res, next) => {
  try {
    // Fetch announcement using service
    const announcement = await getAnnouncementByIdService(req.params.id);

    // Return response
    return res.json({ data: announcement, success: true });
  } catch (err) {
    next(err);
  }
};

// CREATE new announcement
export const createAnnouncement = async (req, res, next) => {
  try {
    // Create announcement using service
    const newAnnouncement = await createAnnouncementService(req.body);

    // Return response
    return res.status(201).json({
      message: "Created successfully",
      success: true,
      data: newAnnouncement,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE announcement by ID
export const updateAnnouncement = async (req, res, next) => {
  try {
    // Update announcement using service
    const updated = await updateAnnouncementService({
      id: req.params.id,
      data: req.body,
    });

    // Return response
    return res.json({
      message: "Updated successfully",
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE announcement by ID
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const deleted = await deleteAnnouncementService(req.params.id);

    if (deleted)
      // Return response
      return res.json({
        message: "Deleted successfully",
        success: true,
      });
  } catch (err) {
    next(err);
  }
};
