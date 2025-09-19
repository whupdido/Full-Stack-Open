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

app.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title: body.title, author: body.author, url: body.url, likes: body.likes },
    { new: true, runValidators: true, context: 'query' }
  )
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})



module.exports = app