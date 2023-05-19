const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.get('/:tagName/posts', async (req, res) => {
    const { tagName } = req.params;
    
    try{
      const posts = await getPostsByTagName(tagName);

      const filteredPosts = posts.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });
      
      if(filteredPosts.length > 0) {
      res.send({ posts: filteredPosts });
      } else {
        next({ 
          name: 'GetPostError', 
          message: 'No active posts found with the given tag name or unauthorized access.' 
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = tagsRouter;
