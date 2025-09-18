const express = require('express')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
const config = require('./utils/configs')

const app = express()

mongoose.connect(config.MONGODB_URI)
app.use(express.json())


app.get('/api/blogs', async (request, response) => {
const blogs = await Blog.find({})
response.json(blogs)
})


app.post('/api/blogs', async (request, response) => {
const blog = new Blog(request.body)
const savedBlog = await blog.save()
response.status(201).json(result)
})


module.exports = app