exports.isLogin = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else{
    res.status(401).send('로그인이 필요합니다.');
  }
}

exports.isNotLogin = (req, res, next) => {
  if(!req.isAuthenticated()){
    next();
  } else{
    res.status(401).send('로그인 된 사용자는 접근할 수 없습니다.');
  }
}