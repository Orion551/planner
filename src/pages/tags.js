import * as React from 'react';
// import { useParams } from "react-router-dom";
import PageTitle from "../components/page-title";

export default function Tags() {
    // const {view} = useParams();

    return (
        <>
            <PageTitle currentView="Tags" />

            <div>
                You are seeing tags.
            </div>

        </>
    )
}