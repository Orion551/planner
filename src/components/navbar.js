import * as React from 'react';
import '../assets/styles/navbar.css';
import logo from '../assets/images/logo_tmp.png';
import Button from "@mui/material/Button";
import NavbarButtons from "./navbar-buttons/navbar-buttons";


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
        </>
    )
}