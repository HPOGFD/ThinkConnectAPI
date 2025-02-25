import { Schema, model, Document, Types } from 'mongoose';

// Interface for User Document
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount: number;
}

// User Schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Virtual for friendCount
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// User Model
const User = model<IUser>('User', userSchema);

export default User;
