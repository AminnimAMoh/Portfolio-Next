import React from 'react'
import {Backdrop, CircularProgress} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      backgroundColor: 'rgba(255,255,255,.2) !important',
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

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
