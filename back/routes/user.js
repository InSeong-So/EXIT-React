const express = require('express');
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
const passport = require('passport');
const router = express.Router();
const { isLogin, isNotLogin } = require('./middlewares');

// 쿠키 정보로 새로고침 시 로그인여부 판단하여 반환하기
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const getUserDataWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }
        ]
      });
      res.status(200).json(getUserDataWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/', isNotLogin, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    // 중복된 이메일이 있다면 router 종료
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const password = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password
    });
    res.status(201).send('ok'); // status 201, 잘 생성되었다.
  } catch (error) {
    console.error(error);
    next(error);  // status 500
  }
});

// 패스포트 전략으로 검증
// 1. 서버에러, 2.성공객체, 3.클라이언트에러
router.post('/login', isNotLogin, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      // 이러면 req, res, next를 사용할 수 없다.
      return next(error);
    }

    if (info) {
      // 허가되지 않음
      return res.status(401).send(info.reason);
    }

    // 패스포트 로그인
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.log(loginErr)
        return next(loginErr);
      }
      const getUserDataWithoutPassword = await User.findOne({
        where: { id: user.id },
        // attributes: ['id', 'nickname', 'email'],
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }
        ]
      });
      // 최종적으로 응답
      return res.status(200).json(getUserDataWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', isLogin, (req, res) => {
  req.logout();
  // req.session = null;
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    // Don't redirect, just print text
    res.send('Logout ok');
  });
});

router.patch('/nickname', isLogin, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname
      },
      {
        where: { id: req.user.id }
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/followers', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if(!user){
      res.status(403).send('가입된 사람이 아니에요!');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/followings', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if(!user){
      res.status(403).send('가입된 사람이 아니에요!');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch('/:userId/follow', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if(!user){
      res.status(403).send('가입된 사람이 아니에요!');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ userId: req.params.userId});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:userId/follow', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if(!user){
      res.status(403).send('가입된 사람이 아니에요!');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ userId: req.params.userId});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/follower/:userId', isLogin, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if(!user){
      res.status(403).send('가입된 사람이 아니에요!');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ userId: req.params.userId});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;