import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import contactRoutes from './routes/contact.route';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: process.env.NODE_ENV === 'production' 
        ? 'https://mimileo.github.io' : 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
))

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello, from Nest Backend!');
});


app.use('/api/contact', contactRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});