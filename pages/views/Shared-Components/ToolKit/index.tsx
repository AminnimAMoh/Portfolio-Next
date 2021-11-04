import { Typography } from "@mui/material";
import React, { ReactElement } from "react";
import styles from "../../../../styles/Toolkit_styles.module.scss";

interface Props {
  name: string;
  state: boolean;
  pos: boolean;
}

function Toolkit({ name, state, pos }: Props): ReactElement {
  return (
    <div className={styles.buttonContainers}>
      <Typography
        variant="caption"
        className={
          state
            ? pos > 0 ?
            styles["buttonContainers__toolkit__" + "open--left"]
            : styles["buttonContainers__toolkit__" + "open--right"]
            : styles["buttonContainers__toolkit__" + "close"]
        }
      >
        {name}
      </Typography>
    </div>
  );
}

export default Toolkit;
