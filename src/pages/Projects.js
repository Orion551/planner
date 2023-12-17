import * as React from 'react';
// import { useParams } from 'react-router-dom';
import PageTitle from "../components/PageTitle";
import ConstructionIcon from '@mui/icons-material/Construction';
import {Typography} from "@mui/material";
import Grid from '@mui/material/Grid';


export default function Projects() {
    return (
        <>
            <Grid
                id="page"
                container
                direction="column"
                spacing={2}
            >
                <Grid item xs={1}>
                    <PageTitle currentView="Projects" />
                </Grid>

                <Grid item xs={11}>
                    <Typography variant="h5">
                        Under construction
                    </Typography>
                    <ConstructionIcon />
                </Grid>
            </Grid>
        </>
    )
};