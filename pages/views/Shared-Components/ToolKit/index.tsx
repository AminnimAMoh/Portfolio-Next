import { Typography } from "@mui/material";
import React, { ReactElement } from "react";
import useStyle from 'styles/Toolkit_styles.js';

interface Props {
    name: string;
    state: boolean;
}

function Toolkit({name, state}: Props): ReactElement {
  const classes=useStyle();

    return (
    <div className={classes.root}>
      <Typography
        variant="caption"
        className={classes.buttonContainers__toolkit}
      >
        {name}
      </Typography>
    </div>
  );
}

export default Toolkit;
