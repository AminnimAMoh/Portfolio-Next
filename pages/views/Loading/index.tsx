import React from 'react'
import {Backdrop, CircularProgress} from '@mui/material';
import useStyles from '../../../styles/Loading_styles'

function Loading(): React.ReactElement {
    const classes = useStyles();
    const open=true;
  
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

export default Loading
