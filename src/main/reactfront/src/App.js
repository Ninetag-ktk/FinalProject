import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.css';
import logo from './temp_logo.png'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import axios from 'axios'

function App() {

    // message 초기값 설정 (""로 설정)
    const [message, setMessage] = useState("");
    const [reResponse, setResResponse] = useState("");

    // useEffect(함수, 배열) : 컴포넌트가 화면에 나타났을 때 자동 실행
    useEffect(() => {
        // fetch(url, options) : Http 요청 함수
        fetch("/google/request")
            .then(response => response.text())
            .then(authorizationUrl => {
                // 1. 새 창에서 리다이렉션
                window.open(authorizationUrl, "_blank");
                //
                // 2. 리다이렉션 URL을 상태 변수에 저장
                //    (예: `setMessage(authorizationUrl)`)
                //
                // 3. 컨트롤러 또는 모델로 데이터 전송
                //    (예: `fetch("/api/callback", {
                //        method: "POST",
                //        body: JSON.stringify({ authorizationUrl }),
                //    })`)
            })
    ;
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    google/request : {message}
                </p>
            </header>
        </div>
    );
}

export default App;