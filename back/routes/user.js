const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');
const router = express.Router();

router.post('/', async (req, res, next) => {
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
router.post('/login', (req, res, next) => {
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

      // 최종적으로 응답
      return res.json(user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destory();
  res.send('ok');
});

module.exports = router;