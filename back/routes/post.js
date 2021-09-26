const express = require('express');
const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLogin } = require('./middlewares');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('created directory uploads')
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);  // 확장자 가져오기
      const basename = path.basename(file.originalname, ext)  // 기본 이름
      done(null, `${basename}_${new Date().getTime()}${ext}`);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.get('/:postId', async (req, res, next) => { // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const getPostInfo = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }],
    })
    res.status(200).json(getPostInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isLogin, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    if (hashtags) {
      // findOrCreate : 있으면 등록x
      const hashtagArray = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      await post.addHashtags(hashtagArray.map((hashtag) => hashtag[0]));
    }
    if (req.body.image) {
      // 이미지 여러개 올리면 배열로 들어옴
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map(image => Image.create({ src: image })));
        await post.addImages(images);
        // 하나면 문자열로 들어옴
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
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
router.post('/:postId/retweet', isLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ]
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    // 자기 게시글 리트윗, 리트윗리트윗리트윗 막기
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
    }
    // 리트윗 된 게시글인지 확인
    const retweetTargetId = post.RetweetId || post.id;
    const retweetedPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId
      },
    });
    if (retweetedPost) {
      return res.status(403).send('이미 리트윗한 글입니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }],
    })
    res.status(201).json(retweetWithPrevPost);
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

router.post('/images', isLogin, upload.array('image'), async (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((file) => file.filename));
});

module.exports = router;