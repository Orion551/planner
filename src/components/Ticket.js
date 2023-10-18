import * as React from 'react';
import TagItem from "./TagItem";
import '../assets/styles/ticket.css';
import { Typography } from "@mui/material";

export default function Ticket() {
    return (
        <>
            <div className="ticket-card-wrapper">
                <TagItem />
                <Typography variant="subtitle1">
                    <span>
                        <span>Wash dishes</span>
                    </span>
                </Typography>

            </div>

        </>
    )
}