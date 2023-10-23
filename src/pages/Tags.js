import * as React from 'react';
// import { useParams } from "react-router-dom";
import PageTitle from "../components/page-title";
import ConstructionIcon from '@mui/icons-material/Construction';
import '../assets/styles/page-general-style.css';
import {Typography} from "@mui/material";

export default function Tags() {
    // const {view} = useParams();

    return (
        <>
            <div className="_page-container">
                <PageTitle currentView="Tags" />
                <Typography variant="h5">
                    Under construction
                </Typography>
                <ConstructionIcon />
            </div>
        </>
    )
}