const mongoose = require('mongoose')

const password = process.argv[2]


const url = `mongodb+srv://kushagrawal275:${password}@cluster0.fvuyp8s.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(result=>{
        console.log(`Added ${person.name} number ${person.number}`)
        mongoose.connection.close()
    })
}

if(process.argv.length === 3){
    Person.find({}).then(result=>{
        console.log('Phonebook:')
        result.forEach(person => {console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}