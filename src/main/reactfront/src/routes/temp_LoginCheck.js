import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Temp_LoginCheck() {
    const redirect = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const autoLogin = params.get("autologin");
    const observe = params.get("observe");
    const loginsession = window.sessionStorage.getItem("observe");
    useEffect(() => {
        if (loginsession != observe) {
            fetch("/google/patch", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    loginsession: loginsession,
                    observe: observe,
                })
            })
            window.sessionStorage.removeItem("token");
        }
        if (autoLogin === "true") {
            window.localStorage.setItem("observe", observe);
        }
        window.sessionStorage.setItem("observe", observe);
        fetch("/google/updateCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(observe),
        })
        redirect("/main");

    }, []);
    return (
        <div>
            <div>로그인 처리중입니다</div>
            <div>잠시만 기다려주세요</div>
        </div>
    )
}