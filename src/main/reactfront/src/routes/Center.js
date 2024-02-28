import React, {useEffect, useState} from "react";

export default function Center () {
    const [user, setUser] = useState("");

    useEffect(() => {
        const user = window.sessionStorage.getItem("user");
        setUser(user);
        alert(user);

    }, []);


    return (
        <div className={"center"}>
        <table border={1}>
            <th>여기에 캘린더 나옴</th>
            <th>여기에 캘린더 나옴2</th>
            <tr>
                <td>{user}</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
            </tr>
            <tr>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
            </tr>
            <tr>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
            </tr>
            <tr>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
            </tr>
            <tr>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
                <td>dd</td>
            </tr>

        </table>
        </div>
    )
}

