import React from 'react';

import {

    Outlet
} from "react-router-dom";



export default function Empty(){
    return (
        <div>
            <Outlet />
        </div>
    )
}




