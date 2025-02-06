import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction'; // ✅ Import the subdocument schema

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // ✅ Embedding reactionSchema as a subdocument array
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Thought Model
const Thought = model('Thought', thoughtSchema);

export default Thought;
