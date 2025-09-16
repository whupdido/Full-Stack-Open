const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals that author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  const zeroBlogs = []
  test('of empty list is null', () => {
    const result = listHelper.mostLikes(zeroBlogs)
    assert.strictEqual(result, null)
  })

  const multipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: 'wetwrhwrhgsrsafda',
      title: 'test2',
      author: 'Test Author',
      url: 'https://example.com/test2',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b5agsdhda4a676234d17f8',
      title: 'test3',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com/test3',
      likes: 12,
      __v: 0
    }
  ]

  test('of a bigger list is the author with most total likes', () => {
    const result = listHelper.mostLikes(multipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
