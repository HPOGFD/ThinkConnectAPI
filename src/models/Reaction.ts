import { Schema, Types } from 'mongoose';

// Reaction Schema (Subdocument)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generates a new ObjectId by default
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Max 280 characters
    },
    username: {
      type: String,
      required: true, // Required username of the reaction author
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(), // Formats timestamp on query
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

export default reactionSchema; // ✅ Exporting as a schema, NOT a model
