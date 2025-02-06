import { Schema } from 'mongoose';

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString()
    }
  },
  {
    toJSON: { getters: true },
    id: false
  }
);

export default reactionSchema;
