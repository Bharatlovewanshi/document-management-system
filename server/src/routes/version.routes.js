const express = require("express");
const router = express.Router();

const {
  getVersionHistory,
  getVersionByNumber,
  restoreVersion
} = require("../controllers/version.controller");

const auth = require("../middlewares/auth.middleware");
const { canViewDocument } = require("../middlewares/permission.middleware");


//Get all versions of a document
//GET /api/versions/:documentId

router.get(
  "/:documentId",
  auth,
  canViewDocument,
  getVersionHistory
);

//Get a specific version of a document
//GET /api/versions/:documentId/:version

router.get(
  "/:documentId/:version",
  auth,
  canViewDocument,
  getVersionByNumber
);

// POST /api/versions/:documentId/:version/restore

router.post(
  "/:documentId/:version/restore",
  auth,
  canViewDocument,
  restoreVersion
);

module.exports = router;
