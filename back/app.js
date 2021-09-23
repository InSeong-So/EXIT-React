const express = require('express');

const postRouter = require('./routes/post.js');

const app = express();


app.get('/', (req, res) => {
  res.send('/');
});

app.get('/posts', (req, res)=>{
  res.json([
    {id: 1, content: 'hello1'},
    {id: 2, content: 'hello2'},
    {id: 3, content: 'hello3'},
  ])
});

// 중복되는 링크를 분리시켜 만든다.
app.use('/post', postRouter);

app.listen(3001, () => {
  console.log('서버 실행');
});