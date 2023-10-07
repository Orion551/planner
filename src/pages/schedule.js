import * as React from 'react';
import { Container } from '@mui/material';
import '../assets/styles/schedule.css';
import PageTitle from "../components/page-title";
import PageDataControls from "../components/page-data-controls";


export default function Schedule() {
    return (
        <>
            {/* Page title (could be a reusable component) */}
            <PageTitle />

            {/* Page controls */}
            <PageDataControls />

            {/* Page actual schedule, which could be broken down in smaller comps... */}
            <Container maxWidth="md" />
        </>
    )
}