import express from 'express';
import cors from 'cors';
import bfhlRoute from './routes/bfhl.js';

const app = express();
const port = process.env.PORT || 4200;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/bfhl', bfhlRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
