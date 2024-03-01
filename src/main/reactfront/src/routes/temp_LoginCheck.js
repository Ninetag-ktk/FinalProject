import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Temp_LoginCheck() {
    const redirect = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const autoLogin = params.get("autologin");
    const observe = params.get("observe");
    useEffect(() => {
        if (autoLogin === "true") {
            window.localStorage.setItem("observe", observe);
        }
        window.sessionStorage.setItem("observe", observe);
        redirect("/main");
    }, []);
}