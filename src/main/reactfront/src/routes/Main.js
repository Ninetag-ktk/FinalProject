import React from "react";
import  { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar";
export default function Main() {

    return (
        <div className={"Main"}>
            <Header />
            <LeftBar />
            <Outlet />

        </div>
    )
}
