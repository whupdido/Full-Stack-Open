const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3003
// eslint-disable-next-line no-undef
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bloglist'


mongoose.connect(MONGODB_URI)
.then(() => {
console.log('Connected to MongoDB')
const server = http.createServer(app)
server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
})
.catch((error) => {
console.error('Error connecting to MongoDB:', error.message)
})