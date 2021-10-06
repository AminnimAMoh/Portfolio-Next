//This is the 'majula'. Dark Souls fans are familiar with this place. 😅
//Here we managing the main states.

import React, { useEffect, useState} from "react";

import dynamic from 'next/dynamic';

import useStyle from "../styles/AppStyle";
import { Snackbar, Slide, useMediaQuery } from "@mui/material";

//Importing the redux store type.
import { RootState } from "../Shared_Components/store";
import { useSelector, useDispatch } from "react-redux";
import { rowGridToggleToReverce } from "../Redux/redux/slices/ScreenSettingsSlice";
import { readDataAgain } from "../Redux/redux/slices/fetchSlice";
// import style from "../";

import Loading from './views/Loading'

const DataFetchPending = dynamic(() => import("./views/DataFetchPending"), {loading: ()=> <Loading/>});
const MenuButton=dynamic(()=> import("./views/MenuButton"), {loading: ()=>  <Loading/>})
const ContentContainer=dynamic(()=> import("./views/ContentContainer"), {loading: ()=>  <Loading/>})

//An easy way to apply transitions to Material-UI components.
//Pre writen transition from Material-UI.
//I could write it my self, just to show off some gadgeta. 😉
function TransitionUp(props: any | undefined | null) {
  return <Slide {...props} direction="up" />;
}

function App(): React.ReactElement {
  const [svgSetupTrigger, setSVGSetupTrigger] = useState<boolean>(false);
  const [snackState, setSnackState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const windowState = useMediaQuery("(max-width:1280px)");

  const {
    buttonAction: { rootState, buttonTrigered },
    dataStore: { annualrain, slums, population, months },
  } = useSelector((state: RootState) => state);
  const classes = useStyle();

  useEffect(() => {
    if (windowState) {
      dispatch(rowGridToggleToReverce(window.innerWidth));
    }
  }, [windowState]);

  useEffect(() => {
    annualrain.state === "fulfilled" &&
      slums.state === "fulfilled" &&
      population.state === "fulfilled" &&
      months.state === "fulfilled" &&
      setSVGSetupTrigger(true);

    (annualrain.state === "rejected" ||
      slums.state === "rejected" ||
      population.state === "rejected" ||
      months.state === "rejected") &&
      setSnackState(true);
  }, [annualrain.state, slums.state, population.state, months.state]);

  //This function controles click action on the snack bar.
  const snackBarRefreshAction = () => {
    //First we set the 'refresh state of the 'fetchSlice' action to trigger the fetch
    //action on the asyncThunk function with state 'rejected'.
    //In this case only the rejected API will be called, not the rest. 🤯
    //More detail at 'fetchSlice.tsx'.
    dispatch(readDataAgain());
    //Close the snack bar.
    setSnackState(false);
  };

  return (
      <div
        className={rootState ? `${classes.root} open` : `${classes.root} close`}
      >
        {!svgSetupTrigger && buttonTrigered === "D3" && (
          <div className={classes.loading}>
            <DataFetchPending />
          </div>
        )}
        <Snackbar
          open={snackState}
          TransitionComponent={TransitionUp}
          message={`Failed to fetch data. Click here to try again.`}
          onClick={snackBarRefreshAction}
          classes={{ root: classes.snackbar }}
        />
        <MenuButton />
        <ContentContainer />
      </div>
  );
}

export default App;
