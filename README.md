# ThinkConnectAPI

ThinkConnectAPI is a social network API built using **Express.js**, **MongoDB**, **Mongoose**, and **TypeScript**. The API allows users to post thoughts, react to others' thoughts, and manage their friend lists. It supports basic CRUD operations for thoughts, reactions, and friends.

## Features

- User registration and management
- Post thoughts and react to thoughts
- Manage reactions on thoughts
- Manage friend lists

## Prerequisites

Before running the API, ensure you have the following installed:

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)
- **TypeScript**: Install globally via npm:
  ```bash
  npm install -g typescript
  ```

## Getting Started

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/HPOGFD/ThinkConnectAPI.git
```

### Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd ThinkConnectAPI
npm install
```

### Set up Environment Variables

Create a `.env` file in the root of the project to store sensitive information:

```bash
MONGO_URI=mongodb://localhost:27017/networkDB
PORT=3001
```

- `MONGO_URI`: URI to connect to your MongoDB database
- `PORT`: Port for the server to run on (default: 3001)

### Start the Server

Run the server in development mode:

```bash
npm run dev
```

The API will be accessible at `http://localhost:3001`.

## API Endpoints

### Users

#### Create User
`POST /api/users`

#### Get All Users
`GET /api/users`

Retrieve a list of all users.

#### Get User by ID
`GET /api/users/:userId`

Retrieve a single user by their ID.

#### Update User by ID
`PUT /api/users/:userId`

Update a user's details.


#### Delete User
`DELETE /api/users/:userId`

Delete a user by their ID.

### Thoughts

#### Create Thought
`POST /api/thoughts`

Create a new thought.

#### Get All Thoughts
`GET /api/thoughts`

Retrieve a list of all thoughts.

#### Get Thought by ID
`GET /api/thoughts/:thoughtId`

Retrieve a single thought by its ID.

#### Update Thought by ID
`PUT /api/thoughts/:thoughtId`

Update a thought by its ID.


#### Delete Thought
`DELETE /api/thoughts/:thoughtId`

Delete a thought by its ID.

### Reactions

#### Add Reaction to Thought
`POST /api/thoughts/:thoughtId/reactions`

Add a reaction to a specific thought.


#### Delete Reaction from Thought
`DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

Delete a specific reaction from a thought.

### Friend List

#### Add Friend
`POST /api/users/:userId/friends/:friendId`

Add a friend to a user's friend list.

#### Remove Friend
`DELETE /api/users/:userId/friends/:friendId`

Remove a friend from a user's friend list.

## Testing

Use tools like Insomnia or Postman to test API endpoints locally:

- POST requests for creating users, thoughts, reactions
- GET requests to retrieve users, thoughts
- DELETE and PUT requests for modifying or deleting users and thoughts


## Contributing

Contributions are welcome! Please submit an issue or a pull request if you would like to help improve this project.

## Acknowledgments

- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- TypeScript - Static typing for JavaScript
- ChatGPT - improving code skills