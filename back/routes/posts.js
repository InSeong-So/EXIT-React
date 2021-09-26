const express = require('express');
const { Post, User, Image, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,   // 개수
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'], // 댓글 정렬
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            }
          ]
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id']
        }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;