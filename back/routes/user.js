const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
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

module.exports = router;