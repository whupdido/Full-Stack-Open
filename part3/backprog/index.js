require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

morgan.token('type', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    response.send(`<p>The Phonebook has the information of ${people.length} people</p> 
    <p>${new Date()}</p>` )
  })
  
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(request.params.id).then(people => {
    if(people){
    response.json(people)}
    else{
      response.status(404).end
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    }).catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) =>{
  const {name, number} = request.body
  Person.findById(request.params.id)
  .then(person =>{
    if(!person){
      return response.status(404).end()
    }
    person.name = name
    person.number = number
    return person.save().then((updatedPerson) =>{
      response.json(updatedPerson)
    })
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next)=>{
const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError'){ 
    return response.status(400).json({ error: error.message })  
  }

  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})