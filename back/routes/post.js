const express = require('express');
const { Post, Comment, Image, User } = require('../models');
const { isLogin } = require('./middlewares');
const router = express.Router();

router.post('/', isLogin, async (req, res, next) => {
  try {
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    const getPostData = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        }
      ],
    })
    res.status(201).json(getPostData)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 동적으로 변경되는 url을 파라미터라고 한다.
router.post('/:postId/comment', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      UserId: req.user.id,
      content: req.body.content,
      PostId: req.params.postId,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/post', (req, res) => {
  res.json({ id: 1 })
});

module.exports = router;