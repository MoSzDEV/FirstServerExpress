import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

let pass = process.env.DB_PASSWORD

const connectionString = `mongodb+srv://MoSzDEV:${pass}@clusterserve.f74gjar.mongodb.net/app`


mongoose.connect(connectionString)
    .then((db) => console.log(`db is connected`))
    .catch((err) => console.error(err))