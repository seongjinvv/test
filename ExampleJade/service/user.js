let User = {};

User.info = (req, res, next) => {
  console.log("User.info :: 호출 됨  ");
  console.log("---------------------------------");
  console.log("req.url :" + req.url);
  console.log("req.body : " + JSON.stringify(req.body) );
  console.log("---------------------------------");
  if(req.body.user_key !== undefined){
    if(req.db){
      //users 컬렉션 참조
      var users = req.db.collection('users');
      users.find({"user_key": req.body.user_key}).toArray(function (err, docs) {
        if(err){console.log(err);res.status(500).send(req.body);}

        if(docs.length > 0){
          console.log("user_key 일치 사용자 찾음. user_key :", req.body.user_key);
          console.log(docs);
          res.docs = docs;
          console.log("-------------------------");
          console.log("res.docs");
          console.log(res.docs);
          console.log("-------------------------");
          next();
        }else{
          console.log("user_key 일치 사용자 찾지 못함. 신규회원.");
          next();
        }
      });

    }else{
      console.log('database 연결 실패.');
      res.status(500).send(req.body);
    }
  }else{
    //res.status(500).send({ error: 'user_key is undefined' });
    res.status(500).send(req.body);
  }

};

module.exports = User;
