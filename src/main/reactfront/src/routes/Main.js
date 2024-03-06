import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar";
import Search from "./Search";
import MainContent from "./MainContent";
import Center from "./Center";

export const MyContext = React.createContext();


export default function Main() {
    const redirect = useNavigate();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    function handleToggle() {
        setIsSearchVisible(!isSearchVisible);
    }

    useEffect(() => {
        alert(window.sessionStorage.getItem("observe"));
        if (window.sessionStorage.getItem("observe") == null) {
            redirect("/");
        }
    }, []);

    return (<div className={"Main"}>
        <MyContext.Provider value={{isSearchVisible, handleToggle}}>
            <div className={"3dan"}>
                <Header/>
                <div className={"leftOUT"}>
                    <LeftBar/>
                    <Outlet>
                        {isSearchVisible ? <Search/> : <MainContent/>}
                    </Outlet>
                </div>
            </div>
        </MyContext.Provider>
    </div>);
}
