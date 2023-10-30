import * as React from 'react';
// import { useParams } from 'react-router-dom';
import PageTitle from "../components/PageTitle";
import {Typography} from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Analytics() {
    return (
        <>
            <div className="_page-container">
                <PageTitle currentView="Analytics" />

                <div className="under-construction-container">
                    <Typography variant="h5">
                        Under construction
                    </Typography>
                    <ConstructionIcon />
                </div>
            </div>


        </>
    )
};