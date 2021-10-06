import {makeStyles} from "@mui/styles"

const useStyle = makeStyles((theme) => ({
    root: {
      width: "100%",
      height: "100%",
      position: "relative",
      "&> *": {
        [theme.breakpoints.up("md")]: {
          padding: theme.spacing(6),
        },
        position: "absolute",
        top: "0",
        left: "0",
      },
    },
  }));

  export default useStyle