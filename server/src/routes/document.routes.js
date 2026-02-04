const express = require("express");
const router = express.Router();

const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  updatePermissions,
  editDocument,
  deleteDocument
} = require("../controllers/document.controller");

const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const {
  canViewDocument,
  canEditDocument
} = require("../middlewares/permission.middleware");


// POST /api/documents/upload
 
router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocument
);

// GET /api/documents

router.get(
  "/",
  auth,
  getDocuments
);

// Get single document

router.get(
  "/:documentId",
  auth,
  canViewDocument,
  getDocumentById
);


// Update permissions

router.put(
  "/:documentId/permissions",
  auth,
  canViewDocument,
  updatePermissions
);

// Edit document (new version)

router.put(
  "/:documentId/edit",
  auth,
  canEditDocument,
  upload.single("file"),
  editDocument
);

// Delete document (soft delete)
 
router.delete(
  "/:documentId",
  auth,
  canViewDocument,
  deleteDocument
);

module.exports = router;
