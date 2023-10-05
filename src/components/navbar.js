import * as React from 'react';
import '../assets/styles/navbar.css';
import logo from '../assets/images/logo_tmp.png';
import Button from "@mui/material/Button";

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                {/* Sidebar content goes here */}
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                    />
                </div>

                {/* This will contain all buttons */}
                <div>

                </div>

                <Button variant="contained">Button</Button>
            </div>
        </>
    )
}