const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/hello', (request, response) => {
    response.json({ message: 'Hello from the backend.' });
});

app.post('/api/data', (request, response) => {
    const { name, age } = request.body;
    response.json({ message: `Recieved data: Name - ${name}, Age - ${age}`});
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});