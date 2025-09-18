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
const body = request.body
const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
})
if (!blog.title || !blog.url) {
  return response.status(400).end()
}
if (blog.likes === undefined) {
  blog.likes = 0
}
const savedBlog = await blog.save()
response.status(201).json(savedBlog)
})


module.exports = app