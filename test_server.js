const express = require('express');
const cors = require('cors');

const getRoutes = require('./routers/getRoutes');
const postRoutes = require('./routers/postRoutes');
const furnitureRoutes = require('./routers/furnitureRoutes');

const app = express();

app.use(cors({
    origin: 'https://simulate-room-web.vercel.app/', // Replace with your Vercel frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/api/get', getRoutes);
app.use('/api/post', postRoutes);
app.use('/api/furniture', furnitureRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});