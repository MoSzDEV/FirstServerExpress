import express from 'express';
export const app = express();
import cors from 'cors';
require('dotenv').config();
require('./bdd');
const User = require('./User');
const notFound = require('./notFound');
const handleErrors = require('./handleErrors');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));


// Healthcheck endpoint
app.get('/', (req, res) => {
  console.log(req.body)
  res.status(200).send({ status: "conexion correcta." });
});

const api = express.Router();

app.get('/api', function (req, res) {
  User.find({}).then((users) => {
    res.json(users)
  })
});

app.post('/api/createUser', function (req, res) {
  const user = req.body;
  const newUser = new User({
    name: user.name,
    employment: user.employment,
    active: user.active,
    comment: user.comment
  })
  newUser.save().then((user) => {
    res.json(user)
  })
});

app.get('/api/:id', function (req, res, next) {
  const { id } = req.params;
  User.findById(id).then(user => {
    if (user) {
      res.json(user)
    } else {
      res.status(404).send({error: 'User not found'})
    }
  })
  .catch((err) => {
    next(err)
  })
});

app.put('/api/:id', function (req, res, next) {
    const { id } = req.params;  
    const user = req.body;
    const newUserInfo = {
      name: user.name,
      employment: user.employment,
      active: user.active,
      comment: user.comment
    }
  User.findByIdAndUpdate(id, newUserInfo, {new: true}).then(user => {
    console.log(user)
    res.status(204).send({message: 'User Updated'})
  })
});

app.delete('/api/:id', function (req, res, next) {
  const { id } = req.params;
  User.findByIdAndRemove(id).then(user => {
    res.status(204).send({message: 'User deleted'})
  })
  .catch((err) => {
    next(err)
  })
});

//midleware
app.use(notFound);
app.use(handleErrors);


// Version the api
app.use('/api/v1', api);
