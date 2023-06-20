module.exports = ((err, req, res, next) => {
    console.error(err.stack)
    if (err.name === 'CastError') {
      res.status(422).send({error: "id used is malformed"})
    }
    else
    res.status(503).send({error: err.message})
  })