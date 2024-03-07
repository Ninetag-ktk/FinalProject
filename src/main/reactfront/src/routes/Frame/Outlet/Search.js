import React from "react";

export default function Search() {
    return (
        <div className={"searchp"}>
            <div className={"search"}>
                <input type={"text"} placeholder={"검색어입력"}/>
                <button>검색</button>
            </div>
        </div>

    )
}