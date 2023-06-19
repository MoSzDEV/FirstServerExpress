import express from 'express';
import cors from 'cors';
export const app = express();
import { config } from 'dotenv';
config();


app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: "conexion correcta." });
});

const api = express.Router();

app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.status(200).send([
    {
      nombre: "Dalit",
      categoria: "user",
    },
    {
      nombre: "Mariano",
      categoria: "admin",
    },
    {
      nombre: "Ignacio",
      categoria: "user",
    },
  ]);
});

// Version the api
app.use('/api/v1', api);
