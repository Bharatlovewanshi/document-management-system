const Document = require("../models/document.model");
const DocumentVersion = require("../models/document.model");
const { successResponse, errorResponse } = require("../utils/response.util");


const getVersionHistory = async (req, res) => {
  try {
    const { documentId } = req.params;

    const versions = await DocumentVersion.find({ documentId })
      .populate("editedBy", "name email")
      .sort({ version: -1 });

    return successResponse(res, "Version history fetched", versions);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch version history", 500);
  }
};


const getVersionByNumber = async (req, res) => {
  try {
    const { documentId, version } = req.params;

    const docVersion = await DocumentVersion.findOne({
      documentId,
      version
    }).populate("editedBy", "name email");

    if (!docVersion) {
      return errorResponse(res, "Version not found", 404);
    }

    return successResponse(res, "Version fetched", docVersion);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch version", 500);
  }
};


const restoreVersion = async (req, res) => {
  try {
    const { documentId, version } = req.params;

    const document = await Document.findById(documentId);
    if (!document || document.isDeleted) {
      return errorResponse(res, "Document not found", 404);
    }

    // Only owner or admin can restore
    if (
      req.user.role !== "ADMIN" &&
      !document.uploadedBy.equals(req.user._id)
    ) {
      return errorResponse(res, "Not authorized to restore version", 403);
    }

    const oldVersion = await DocumentVersion.findOne({
      documentId,
      version
    });

    if (!oldVersion) {
      return errorResponse(res, "Version not found", 404);
    }

    const newVersionNumber = document.currentVersion + 1;

    // Create new version using old file
    await DocumentVersion.create({
      documentId,
      version: newVersionNumber,
      fileUrl: oldVersion.fileUrl,
      editedBy: req.user._id,
      changeNote: `Restored from version ${version}`
    });

    // Update document
    document.fileUrl = oldVersion.fileUrl;
    document.currentVersion = newVersionNumber;
    await document.save();

    return successResponse(res, "Version restored successfully", {
      restoredFrom: version,
      newVersion: newVersionNumber
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to restore version", 500);
  }
};

module.exports = {
  getVersionHistory,
  getVersionByNumber,
  restoreVersion
};
