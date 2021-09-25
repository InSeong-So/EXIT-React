const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const passportConfig = require('./passport');
const passport = require('passport');
const morgan = require('morgan');

dotenv.config();
const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DATABASE_CONNECTED_SUCCES');
  })
  .catch(() => {
    console.error
  });

passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin:true,
  credentials: true,  // 쿠키 허용
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 쿠키 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
// 세션 설정
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('/');
});

// 중복되는 링크를 분리시켜 만든다.
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(3001, () => {
  console.log('서버 실행');
});