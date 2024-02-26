import React from "react";
import  { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftBar from "./LeftBar";
export default function Frame() {

    return (
        <div className={"Frame"}>
            <Header />
            <LeftBar />
            <Outlet />

        </div>
    )
}
