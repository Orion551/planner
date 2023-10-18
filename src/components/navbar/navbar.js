import * as React from 'react';
import '../../assets/styles/navbar.css';
import logo from '../../assets/images/logo_tmp.png';
import NavbarButtons from "./navbar-buttons";
import { Outlet } from "react-router-dom";


export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                    />
                </div>
                {/* Navbar buttons (schedule, reports, analytics and more..) */}
                <NavbarButtons />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}