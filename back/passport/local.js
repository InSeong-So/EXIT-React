const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(new LocalStrategy({
    // req.body.email
    usernameField: 'email',
    // req.body.password
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      // 아이디 비교
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        // 1.서버에러, 2.성공, 3.클라이언트에러
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
      }
      // 비밀번호 비교
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 올바르지 않습니다.' });
      
    } catch (error) {
      console.error(error);
      // 서버 에러 나면 이렇게 처리
      return done(error);
    }
  }));
};