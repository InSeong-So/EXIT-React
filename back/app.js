const express = require('express');
const cors = require('cors');
const db = require('./models');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();
db.sequelize.sync().then(() => {
  console.log('db연결 성공')
}).catch(console.error)

app.use(cors({
  origin: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('/');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ])
});

// 중복되는 링크를 분리시켜 만든다.
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3001, () => {
  console.log('서버 실행');
});