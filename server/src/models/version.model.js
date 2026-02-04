const mongoose = require("mongoose");

const documentVersionSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true
    },

    version: {
      type: Number,
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    changeNote: String
  },
  { timestamps: true }
);

// Prevent duplicate version numbers per document
documentVersionSchema.index(
  { documentId: 1, version: 1 },
  { unique: true }
);

module.exports = mongoose.model("DocumentVersion", documentVersionSchema);
