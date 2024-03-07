// 1. mongoose 모듈 가져오기
const mongoose = require('mongoose');
const {connect} = require("mongoose");
// 2. testDB 세팅
mongoose.connect('mongodb://root:76435855@43.203.30.193:27017/e6eo?authSource=admin');
// 3. 연결된 testDB 사용
const db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});
module.exports = connect;