const Document = require("../models/document.model");

const canViewDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.documentId);

    if (!document || document.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    const userId = req.user._id;
    const userRole = req.user.role;

    if (
      userRole === "ADMIN" ||
      document.uploadedBy.equals(userId) ||
      document.accessLevel !== "PRIVATE" ||
      document.permissions.some(p => p.userId.equals(userId))
    ) {
      req.document = document;
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "View permission denied"
    });
  } catch (err) {
    next(err);
  }
};

const canEditDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.documentId);

    if (!document || document.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    const userId = req.user._id;
    const userRole = req.user.role;

    if (
      userRole === "ADMIN" ||
      document.uploadedBy.equals(userId) ||
      document.accessLevel === "PUBLIC_EDIT" ||
      document.permissions.some(
        p => p.userId.equals(userId) && p.canEdit
      )
    ) {
      req.document = document;
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Edit permission denied"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  canViewDocument,
  canEditDocument
};
