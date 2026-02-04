const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    fileUrl: { type: String, required: true,
              cloudinaryId: {
              type: String
            }

     },
    fileType: String,

    tags: [String],

    // Owner of the document (any user)
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    accessLevel: {
      type: String,
      enum: ["PRIVATE", "PUBLIC_VIEW", "PUBLIC_EDIT"],
      default: "PRIVATE"
    },

    permissions: [permissionSchema],

    currentVersion: {
      type: Number,
      default: 1
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Search support
documentSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Document", documentSchema);
