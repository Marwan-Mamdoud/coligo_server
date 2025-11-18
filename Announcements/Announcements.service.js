import redis from "../lib/SetupRedis.js";
import Announcement from "./Announcements.model.js";

export const getAllAnnouncementsService = async () => {
  try {
    let announcements;

    // Check cache first
    announcements = await redis.get("announcements");

    if (!announcements) {
      // If not in cache, fetch from DB
      announcements = await Announcement.find().sort({ createdAt: -1 });
      await redis.set("announcements", announcements, { ex: 3600 }); // Cache for 1 hour
    }

    // Return response
    return announcements;
  } catch (error) {
    throw error;
  }
};

export const getAnnouncementByIdService = async (id) => {
  try {
    // Find announcement by ID
    const announcement = await Announcement.findById(req.params.id);

    // If not found, throw error
    if (!announcement) throw new Error("Announcement Not found");

    // Return response
    return announcement;
  } catch (error) {
    throw error;
  }
};

export const createAnnouncementService = async (data) => {
  try {
    // Get data from request body
    const { description, category } = data;

    // Create new announcement
    const newAnnouncement = new Announcement({ description, category });
    await newAnnouncement.save();

    // Invalidate cache
    await redis.del("announcements");

    // Return response
    return newAnnouncement;
  } catch (error) {
    throw error;
  }
};

export const updateAnnouncementService = async (id, data) => {
  try {
    // Get data from request body
    const { description, category } = data;

    // Find and update announcement
    const updated = await Announcement.findById(id);

    // If not found, throw error
    if (!updated) throw new Error("Announcement Not found");

    // Update fields
    updated.description = description || updated.description;
    updated.category = category || updated.category;
    await updated.save();

    // Invalidate cache
    await redis.del("announcements");

    // Return response
    return updated;
  } catch (error) {
    throw error;
  }
};

export const deleteAnnouncementService = async (id) => {
  try {
    // Find and delete announcement
    const deleted = await Announcement.findByIdAndDelete(id);

    // If not found, throw error
    if (!deleted) throw new Error("Announcement Not found");

    // Invalidate cache
    await redis.del("announcements");

    // Return response
    return deleted;
  } catch (error) {
    throw error;
  }
};
