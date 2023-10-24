import * as React from 'react';
// import { useParams } from 'react-router-dom';
import PageTitle from "../components/PageTitle";
import ConstructionIcon from '@mui/icons-material/Construction';
import '../assets/styles/page-general-style.css';
import {Typography} from "@mui/material";

export default function Projects() {
    return (
        <>
            <div className="_page-container">
                <PageTitle currentView="Projects" />
                <Typography variant="h5">
                    Under construction
                </Typography>
                <ConstructionIcon />
            </div>
        </>
    )
};