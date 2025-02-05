import express from 'express';
import connectDB from './config/connection.js';
import routes from './routes/index.js';

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
};

startServer();