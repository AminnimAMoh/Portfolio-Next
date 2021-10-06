import { Typography } from '@mui/material'
import React from 'react'
import useStyle from '../../../../styles/Pages_styles'


function Undeveloped(): React.ReactElement {
    const classes=useStyle();
    return (
        <div>
            <Typography variant='h3' className={classes.topick_heading}>
                This page is temporary unavailable.
            </Typography>
        </div>
    )
}

export default Undeveloped
