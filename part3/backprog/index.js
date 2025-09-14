const http = require('http')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

morgan.token('type', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


app.get('/info', (request, response) => {
  response.send(`<p>The Phonebook has the information of ${persons.length} people</p> 
    <p>${new Date()}</p>` )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(request.params.id).then(people => {
    response.json(people)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response)=>{
const newper = request.body
if(!newper.name){
    response.status(400).json({ error: 'Name missing'})
}
else if(!newper.number){
    response.status(400).json({ error: 'Number missing'})
}
else if(persons.some(person=>person.name == newper.name)){
    response.status(400).json({ error: 'Name must be unique'})
}
else{
newper.id= Math.floor(Math.random()*99999999)
persons = persons.concat(newper)
response.json(newper)}
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})