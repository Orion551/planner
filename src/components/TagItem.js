import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function TagItem(props) {
    const {tag} = props;

    return (
        <>
            <Chip label={tag} />
        </>
    )
}