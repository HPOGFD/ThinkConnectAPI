import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thought-model.js';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/networkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log('🔥 Database Cleared');

    // Seed Users (10 users)
    const users = await User.insertMany([
      { username: 'alpha', email: 'alpha@example.com', thoughts: [], friends: [] },
      { username: 'zulu', email: 'zulu@example.com', thoughts: [], friends: [] },
      { username: 'john', email: 'john@example.com', thoughts: [], friends: [] },
      { username: 'mary', email: 'mary@example.com', thoughts: [], friends: [] },
      { username: 'bob', email: 'bob@example.com', thoughts: [], friends: [] },
      { username: 'alice', email: 'alice@example.com', thoughts: [], friends: [] },
      { username: 'charlie', email: 'charlie@example.com', thoughts: [], friends: [] },
      { username: 'eve', email: 'eve@example.com', thoughts: [], friends: [] },
      { username: 'dan', email: 'dan@example.com', thoughts: [], friends: [] },
      { username: 'grace', email: 'grace@example.com', thoughts: [], friends: [] }
    ]);

    console.log('👤 Users Seeded:', users);

    // Seed Thoughts (2 thoughts per user, total 10 users * 2 thoughts)
    const thoughts = await Thought.insertMany([
      { thoughtText: 'The first thought from alpha', username: users[0].username, reactions: [] },
      { thoughtText: 'Another thought from zulu', username: users[1].username, reactions: [] },
      { thoughtText: 'John’s thought about the world', username: users[2].username, reactions: [] },
      { thoughtText: 'Mary’s big idea on tech', username: users[3].username, reactions: [] },
      { thoughtText: 'Bob’s creative thought on design', username: users[4].username, reactions: [] },
      { thoughtText: 'Alice’s opinion on the future', username: users[5].username, reactions: [] },
      { thoughtText: 'Charlie’s theory on productivity', username: users[6].username, reactions: [] },
      { thoughtText: 'Eve’s perspective on leadership', username: users[7].username, reactions: [] },
      { thoughtText: 'Dan’s view on teamwork', username: users[8].username, reactions: [] },
      { thoughtText: 'Grace’s opinion on strategy', username: users[9].username, reactions: [] }
    ]);

    console.log('💭 Thoughts Seeded:', thoughts);

    // Update Users with Thought IDs (each user gets 2 thoughts)
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, { $push: { thoughts: thoughts[i % 10]._id } });
      await User.findByIdAndUpdate(users[i]._id, { $push: { thoughts: thoughts[(i + 1) % 10]._id } });
    }

    console.log('🔗 Users linked with Thoughts');

    // Seed Reactions for Thoughts
  // Seed Reactions for Thoughts
for (let i = 0; i < thoughts.length; i++) {
    await Thought.updateOne(
      { _id: thoughts[i]._id },
      {
        $push: {
          reactions: {
            reactionBody: 'Sample reaction',
            username: users[(i + 1) % users.length].username
          }
        }
      }
    );
  }
  
  console.log('💬 Reactions Seeded');
  ;

    // Save updated Thoughts with reactions
    await Promise.all(thoughts.map((thought) => thought.save()));

    console.log('💬 Reactions Seeded');

    mongoose.connection.close();
    console.log('✅ Database Seeded Successfully');
  } catch (error) {
    console.error('❌ Error Seeding Database:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
