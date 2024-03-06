import {redirect, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const handleLogin = async () => {
    const response = await fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json; charset=utf-8",
        },
        body: JSON.stringify(loginInfo),
    });
    const result = await response.json();
    if (result.code === "200") {
        // 로그인 성공 처리
        redirect(`/check?autologin=${autoLogin}&observe=${result.body}`,);
    } else {
        // 로그인 실패 처리
        alert(result.body);
        // window.location.href = "/";
    }
};
//////////////////////////////////////////////////////////////////////////////////
const handleLogin = async () => {
    const response = await axios({
        url: "/user/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json; charset=utf-8",
        },
        data: loginInfo,
    });

    const res = response.data;

    if (res.code === "200") {
        // 로그인 성공 처리
        redirect(`/check?autologin=${autoLogin}&observe=${res.data}`,);
    } else {
        // 로그인 실패 처리
        alert(res.data);
        // 필요에 따라 다른 처리 추가
    }
};
//////////////////////////////////////////////////////
//1.어떤 기능  -> Main.js에 있는 useEffect 부분
// observe 에 값이 있는지 없는지 확인
// if(세션observe = null) {}
//2. 기능 수행하기 위해 무엇을 받아와야하는가
// 세션에 데이더가 있을 것.
// window.sessionStorage.getItem("observe")
//3. 기능을 수행하고 다른 기능에 데이터를 보내줘야 하는가
// 만약 없다면 / 있다면 // 보내줄 필요 없음
//4. 어디서&어떻게 : => useEffect
// 처음 main 이라는 페이지가 로딩이 될 때
// 서버에서??
//    어떻게 : 세션을 window.sessionStorage.getItem으로 가져와서
//            세션이 있으면 "/main"으로 없으면 "/"로 보내기
useEffect(() => {
    if (window.sessionStorage.getItem("observe") == null){
        redirect("/");
    } redirect("/main");
}, []);
//////////////////////////////////////////////////////
//1.어떤 기능  -> Login.js에 있는 useEffect 부분
// 로컬스토리지에 observe 값이 있는지 없는지 확인
// if(로컬observe != null) {}
//2. 기능 수행하기 위해 무엇을 받아와야하는가
// 로컬에 데이터가 있을 것
// window.localStorage.getItem("observe")
//3. 기능을 수행하고 다른 기능에 데이터를 보내줘야 하는가
// 만약 없다면 / 있다면 => 컨트롤러로 실어서 보내줘야함.
//4. 어디서&어떻게 : => useEffect
// 로그인 이라는 페이지에서 로그인 버튼을 누를 때
// 어떻게 : observe 값을 window.localStorage.getItem으로 가져와서
//         observe 값이 있으면 컨트롤러로 보냄 없으면 초기 화면으로 다시 보냄

useEffect(() => {
   if (window.localStorage.getItem("observe")!=null){
       return "obs";
   } return null;
}, []);
//////////////////////////////////////////////////////
//1.어떤 기능  -> 에 있는  부분
// 유효성 체크(받는것도 있고 주는것도 있음)
//
//2. 기능 수행하기 위해 무엇을 받아와야하는가
// 데이터 베이스에 옵저브 토큰이 있을 것
// usersMapper.findByObserveToken(observeToken);
//3. 기능을 수행하고 다른 기능에 데이터를 보내줘야 하는가
// 만약 false / true
//4. 어디서&어떻게 : => useEffect
// 로그인 이라는 페이지에서 로그인 버튼을 누를 때
// 어떻게 : 옵저브 토큰이 DB에 있는지 usersMapper.findByObserveToken(observeToken)으로 확인 후
//         observeToken 값이 있으면 세션에 저장 없으면 로컬스토리지의 데이터 삭제.

// useEffect(() => {
//     if (==true) {
//         widow.localStorage.setItem("observe");
//         } else {
//         widow.localStorage.removeItem("observe");
//     }
// }, []);

////////////////////////////////////////////
//UserController
// @PostMapping("/testToken")
//         public String testToken(@RequestBody UsersEntity users) {
//             usersDao.testToken(users);
//             return ;
//         }
//
// UserDAO
// public ResponseEntity<?> testToken(String observeToken, String pw) {
//         Map<String, String> result = new HashMap<>();
//          Optional<UsersEntity> user = usersMapper.findByObserveToken(observeToken);
//          if (user.isEmpty()) {
//              result.put("code", "400");
//              result.put("body", "false");
//              return ResponseEntity.badRequest().body(result);
//          } else if (!pw.equals(user.get().getPw())) {
//              result.put("code", "400");
//              result.put("body", "false");
//              return ResponseEntity.badRequest().body(result);
//
//          } else {
//              result.put("code", "200");
//              result.put("body", "true");
//              return ResponseEntity.ok(result);
//          }
//      }
//
//const handleLogin = async () => {
//         const response = await fetch("/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//                 "Accept": "application/json; charset=utf-8",
//             },
//             body: JSON.stringify(loginInfo),
//         });
//         const result = await response.json();
//         if (result.code === "200") {
//             // 로그인 성공 처리
//             redirect(`/check?autologin=${autoLogin}&observe=${result.body}`,);
//         } else {
//             // 로그인 실패 처리
//             alert(result.body);
//             // window.location.href = "/";
//         }
//     };

////////////////////////////////////////////
// 159~166번줄이 task:get,insert,patch,deldete 캘린더:insert,patch,delete별로 적으면됨 나머지 줄들은 1번만 써주면 됨
//const [apiKey, setApiKey] = useState("");
// const [accessToken, setAccessToken] = useState("");
//
// const insertTask = {
// 	url = "~~~~/?key={apiKey}",
// 	methpd = "post",
// 	header: {
// 		'Authorization: Bearer {accessToken}'
// 		'Accept: application/json'
//     		'Content-Type: application/json',
// }
//
//
// fetch("/서버요청" , {
// 	method: ~~,
// 	headers: {
// 		"Content-Type": "application/json; charset=utf-8",
//                	 "Accept": "application/json; charset=utf-8",
// 	},
// 	body: JSON.stringify("observe":window.sessionStorage.getItem("observe")),
// }).then(response => {
// 	const result = response.json()
// 	setApiKey(result.get("apiKey"));
// 	setAccessToken(result.get("accessToken"));
// 	axios(insertTask)
// }
const [apiKey, setApiKey] = useState("");
const [accessToken, setAccessToken] = useState("");

const getTask = {
 	url: "https://www.googleapis.com/calendar/v3/calendars/calendarId/events={apiKey}",
 	method: "POST",
 	header: {
        "Authorization": "Bearer {accessToken}",
        "Accept": "application/json",
 }
