import 'dotenv';
import 'reflect-metadata';
import './shared/container';
import express from 'express';
import router from './routes';


const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.use(router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
