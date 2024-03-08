// 1. mongoose 모듈 가져오기
const mongoose = require('mongoose');
const {connect} = require("mongoose");
const MONGO_URI = process.env.REACT_APP_MONGO_URI;
// 2. testDB 세팅
console.log(process.env.REACT_APP_MONGO_URI);
mongoose.connect(MONGO_URI, {
}).then(()=>{console.log("MongoDB Connected...")})
    .catch((e)=>{console.log("MongoDB fail-", e)});
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
