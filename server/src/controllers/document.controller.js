const Document = require("../models/document.model");
const DocumentVersion = require("../models/document.model");
const { successResponse, errorResponse } = require("../utils/response.util");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");

const ACCESS_LEVELS = ["PRIVATE", "PUBLIC_VIEW", "PUBLIC_EDIT"];


const uploadDocument = async (req, res) => {
  try {
    const { title, description, tags, accessLevel, permissions } = req.body;
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if (!req.file) {
      return errorResponse(res, "File is required", 400);
    }

    if (!title) {
      return errorResponse(res, "Title is required", 400);
    }

    if (accessLevel && !ACCESS_LEVELS.includes(accessLevel)) {
      return errorResponse(res, "Invalid access level", 400);
    }

    // Parse tags safely
    const parsedTags =
      typeof tags === "string" ? tags.split(",") : tags || [];

    // Parse permissions safely
    const parsedPermissions = permissions
      ? JSON.parse(permissions)
      : [];

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      "dms-documents",
      req.file.mimetype
    );

    console.log("Cloudinary result:", result);

    const document = await Document.create({
      title,
      description,
      fileUrl: result.url,       
      cloudinaryId: result.public_id,
      fileType: req.file.mimetype,
      tags: parsedTags,
      uploadedBy: req.user._id,
      accessLevel: accessLevel || "PRIVATE",
      permissions: parsedPermissions
    });

    console.log("Saving fileUrl:", result.url);
    return successResponse(
      res,
      "Document uploaded successfully",
      document,
      201
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Document upload failed", 500);
  }
};

const getDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let query = { isDeleted: false };

    if (userRole !== "ADMIN") {
      query.$or = [
        { uploadedBy: userId },
        { accessLevel: { $ne: "PRIVATE" } },
        { "permissions.userId": userId }
      ];
    }

    const documents = await Document.find(query)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    return successResponse(res, "Documents fetched", documents);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch documents", 500);
  }
};

const getDocumentById = async (req, res) => {
  try {
    return successResponse(res, "Document fetched", req.document);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch document", 500);
  }
};

const updatePermissions = async (req, res) => {
  try {
    const document = req.document;
    const { accessLevel, permissions } = req.body;

    if (
      req.user.role !== "ADMIN" &&
      !document.uploadedBy.equals(req.user._id)
    ) {
      return errorResponse(res, "Not authorized", 403);
    }

    if (accessLevel && !ACCESS_LEVELS.includes(accessLevel)) {
      return errorResponse(res, "Invalid access level", 400);
    }

    if (accessLevel) document.accessLevel = accessLevel;
    if (permissions) document.permissions = permissions;

    await document.save();

    return successResponse(
      res,
      "Permissions updated successfully",
      document
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to update permissions", 500);
  }
};

const editDocument = async (req, res) => {
  try {
    const document = req.document;

    if (!req.file) {
      return errorResponse(res, "File is required", 400);
    }

    // Upload NEW file
    const result = await uploadToCloudinary(
      req.file.buffer,
      "dms-documents"
    );

    // Save OLD version (important)
    await DocumentVersion.create({
      documentId: document._id,
      version: document.currentVersion,
      fileUrl: document.fileUrl,
      editedBy: req.user._id,
      changeNote: req.body.changeNote || ""
    });

    // Update document
    document.fileUrl = result.secure_url;
    document.cloudinaryId = result.public_id;
    document.fileType = req.file.mimetype;
    document.currentVersion += 1;

    await document.save();

    return successResponse(
      res,
      "Document updated successfully",
      document
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to update document", 500);
  }
};

const deleteDocument = async (req, res) => {
  try {
    const document = req.document;

    if (
      req.user.role !== "ADMIN" &&
      !document.uploadedBy.equals(req.user._id)
    ) {
      return errorResponse(res, "Not authorized", 403);
    }

    // Delete file from Cloudinary
    if (document.cloudinaryId) {
      await cloudinary.uploader.destroy(document.cloudinaryId);
    }

    document.isDeleted = true;
    await document.save();

    return successResponse(res, "Document deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to delete document", 500);
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentById,
  updatePermissions,
  editDocument,
  deleteDocument
};
