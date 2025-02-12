const express = require('express');
const cors = require('cors');

const getRoutes = require('./routers/getRoutes');
const postRoutes = require('./routers/postRoutes');
const furnitureRoutes = require('./routers/furnitureRoutes');
const roomRoutes = require('./routers/roomRoutes');

const app = express();

const allowedOrigins = [
    'https://simulate-room-web-nextjs-7lkr.vercel.app/',  // Production URL
    'http://localhost:3000',                 // Local development URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));  
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true, 
}));

app.use(express.json());

app.use('/api/get', getRoutes);
app.use('/api/post', postRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/room', roomRoutes);

const port = 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

module.exports = app;