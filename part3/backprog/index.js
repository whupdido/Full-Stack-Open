const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('type', function (req, res) { return JSON.stringify(req.body)})
let persons =[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`<p>The Phonebook has the information of ${persons.length} people</p> 
    <p>${new Date()}</p>` )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person=>person.id === id)
  if(person){
    response.json(person)
  }
  else{response.status(404).end()}
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((note) => note.id !== id)

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