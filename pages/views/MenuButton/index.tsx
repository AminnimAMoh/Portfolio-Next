import React, { useState, useRef } from "react";
import { RootState } from "../../../Shared_Components/store";
import useStyle from "../../../styles/MenuButton_style";
import useMeasure from "react-use-measure";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../Shared_Components/store";
import Image from "next/image";
import dynamic from "next/dynamic";
import Loading from "../Loading";

import {
  containerStateToggle,
  onDelayStateChange,
} from "../../../Redux/redux/slices/buttonActionSlice";
import { useMediaQuery } from "@mui/material";

import PowerButton from "/public/images/Button/Menu_Trigger/Power_Button-Stoke.png";

const Buttons = dynamic(() => import("./Buttons"), {
  loading: () => <Loading />,
});

interface mediaQueries {
  rootState: boolean;
  phase: boolean;
}

const calPos = (
  index: number,
  length: number,
  size: number,
  state: boolean,
  windowState: mediaQueries
) => {
  if (windowState.rootState) {
    const inc = state ? 1.5 : 3;
    const rad = size / inc;
    const angle = ((2 * Math.PI) / length) * index;
    const x = rad * Math.cos(angle);
    const y = rad * Math.sin(angle);
    return { x, y };
  } else {
    const phase = windowState.phase ? 8 : 20;
    const inc = state ? 3 : 30;
    const angle = ((Math.PI * 2) / length + 2) * index;
    const rad = size / inc;
    const x = rad * 5 * Math.cos(angle) + 5 * (rad * Math.sin(angle)) - phase;
    const y = 0;
    return { x, y };
  }
};
function MenuButton(): React.ReactElement {
  const classes = useStyle();
  const dispatch: AppDispatch = useDispatch();
  const windowState = {
    rootState: useMediaQuery("(min-width:1280px)"),
    phase: useMediaQuery("(max-width:560px)"),
  };

  const parentElement = useRef<HTMLDivElement>(null);
  const {
    buttonAction: { rootState, delayState, data },
    screenAction: { screenState },
  } = useSelector((state: RootState) => state);
  const [buttonMesures, { width }] = useMeasure();
  const [powerState, setPowerState] = useState<boolean>(false);
  const buttonSizing = width;

  const handlePowerClick = () => {
    const parentChilrdernLength = parentElement.current?.childElementCount;
    const prentArray = parentElement.current?.children;
    if (parentChilrdernLength && prentArray) {
      for (let i = 1; i < parentChilrdernLength; i++) {
        prentArray[i].children[0].classList.remove("focused");
      }
    }
    if (rootState) {
      dispatch(containerStateToggle("PowerButton"));
      setTimeout(() => {
        dispatch(onDelayStateChange());
      }, 500);
    } else {
      setPowerState(() => !powerState);
    }
  };

  return (
    <div
      className={classes.root}
      ref={parentElement}
      style={
        screenState === "wide" && !rootState && !delayState
          ? { paddingRight: 0 }
          : screenState === "limited" && !rootState
          ? { paddingTop: 0 }
          : {}
      }
    >
      <div
        className={
          powerState
            ? `${classes.powerButton} open`
            : `${classes.powerButton} close`
        }
        onClick={handlePowerClick}
        ref={buttonMesures}
      >
        <Image src={PowerButton} alt="content-asset" />
      </div>

      {data.map(
        (
          {
            name,
            img,
            toolKit,
            info,
          }: { name: string; img: string; toolKit: string; info: string },
          index: number
        ) => {
          const { x, y } = calPos(
            index,
            data.length,
            buttonSizing,
            powerState,
            windowState
          );
          const props = {
            parentElement: parentElement,
            name: name,
            coordinates: { x: x, y: y },
            buttonSizing: buttonSizing,
            toolKit: toolKit,
            img: img,
          };
          return <Buttons key={name} {...props} />;
        }
      )}
    </div>
  );
}

export default MenuButton;
