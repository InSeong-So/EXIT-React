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
          include: {
            model: User,
            attributes: ['id', 'nickname']
          }
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
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
    const getCommentUser = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        },
      ]
    })
    res.status(201).json(getCommentUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:postId', isLogin, async (req, res, next) => {
  try {
    const post = await Post.destroy({ where: { id: req.params.postId, UserId: req.user.id } });
    res.status(200).json({ postId: req.params.postId });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch('/:postId/like', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:postId/like', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;