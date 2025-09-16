/* eslint-disable no-unused-vars */
var _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
    const sum = blogs.reduce(
  (accumulator, currentValue) => accumulator + currentValue.likes,0
)
return sum
  }

const favoriteBlog = (blogs) => {
  if(blogs[0]){
  return blogs.toSorted((a, b)=>b.likes-a.likes)[0]}
  else{
    return null
  }
}

const mostBlogs = (blogs) => {
  if(blogs[0]){
  const countObj = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.keys(countObj), (author) => countObj[author]);

  return {
    author: topAuthor,
    blogs: countObj[topAuthor]
  }}
  return null
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  // group blogs by author
  const grouped = _.groupBy(blogs, 'author');

  // sum likes per author
  const likesPerAuthor = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }));

  // pick the author with most likes
  return _.maxBy(likesPerAuthor, 'likes');
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}