// 몽구스를 이용해서 몽고DB에서 데이터 받아오기
//  const mon = require('mongoose')
//  mon.connect("mongodb://root:76435855@43.203.30.193:27017/e6eo?authSource=admin", {
//      useNewUrlParser: true, useUnifiedTopology: true
//  }).then(() => console.log('MongoDB Connected..'))
//      .catch(err =>console.log(err))

// const mongoose = require('mongoose');
// const { Post } = require('./category');
//
// mongoose.connect('mongodb://43.203.30.193:27017/category');
//
// const { Post}
// async function getUsers() {
//
//     const users = await Users
//
//         .find({ name: 'socratone', isCashed: true })
//
//         .limit(10)
//
//         .sort({ name: 1 })
//
//         .select({ name: 1, hobby: 1 });
//
//     console.log(users);
//
// }
//
// getUsers();
// 1. mongoose 모듈 가져오기
const mongoose = require('mongoose');
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
// 6. Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
const categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true, // null 여부
        unique: true, // 유니크 여부
    },
    categories: {
        type: String,
        required: true, // null 여부

    }
});
const notesSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true, // null 여부
        unique: true, // 유니크 여부

    },
    category_id: {
        type: String,
        required: true, // null 여부

    },
    type: {
        type: String,
        required: true, // null 여부

    },
    status: {
        type: String,
        required: true, // null 여부

    },
    start_time: {
        type: Date,
        default: Date.now, // 기본값
    },
    end_time: {
        type: Date,
    },
    contents: {
        type: String,
        required: true, // null 여부

    },
    etag: {
        type: String,
        required: true, // null 여부

    },
    have_repost: {
        type: String,
        required: true, // null 여부

    }
});
// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
var CategorySchema = mongoose.model('Schema', categorySchema);
var NotesSchema = mongoose.model('Schema', notesSchema);

// 8. Student 객체를 new 로 생성해서 값을 입력
var newCategorySchema = new CategorySchema({_id:'Hong Gil Dong', categories:'서울시 강남구 논현동'});
var newNotesSchema = new NotesSchema({_id:'Hong Gil Dong', category_id:'서울시 강남구 논현동', type:'서울시 강남구 논현동', status:'서울시 강남구 논현동', start_time:'서울시 강남구 논현동', end_time:'서울시 강남구 논현동', contents:'서울시 강남구 논현동', etag:'서울시 강남구 논현동', have_repost:'서울시 강남구 논현동'});
// 9. 데이터 저장
newCategorySchema.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});
newNotesSchema.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});
// 10. Student 레퍼런스 전체 데이터 가져오기
CategorySchema.find(function(error, categorySchema){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(categorySchema);
    }
})
NotesSchema.find(function(error, notesSchema){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(notesSchema);
    }
})