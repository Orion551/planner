import * as React from 'react';
import PageTitle from "../components/PageTitle";
import ConstructionIcon from '@mui/icons-material/Construction';
import {Typography} from "@mui/material";

export default function Tags() {

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