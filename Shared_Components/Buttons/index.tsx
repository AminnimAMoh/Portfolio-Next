import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { containerStateToggle } from "../../Redux/redux/slices/buttonActionSlice";
import { ClassNameMap } from "@mui/styles";

interface Props {
    x: number;
    y: number;
    classes: ClassNameMap;
    name: string;
    buttonSizing:number;
    img: string;
    parentElement: React.RefObject<HTMLDivElement>;
}

function Buttons({...props}: Props): ReactElement {
  const dispatch: AppDispatch = useDispatch();
    
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const payload = e.currentTarget.id;
    const parentChilrdernLength = props.parentElement.current?.childElementCount;
    const prentArray = props.parentElement.current?.children;
    if (parentChilrdernLength && prentArray) {
      for (let i = 1; i < parentChilrdernLength; i++) {
        prentArray[i].children[0].id === payload
          ? prentArray[i].children[0].classList.add("focused")
          : prentArray[i].children[0].classList.remove("focused");
      }
    }
    dispatch(containerStateToggle(payload));
  };
  return (
    <div
      className={props.classes.buttonContainers}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    >
      <div
        id={props.name}
        className={props.classes.iconButtons}
        style={{
          width: props.buttonSizing / 4,
          height: props.buttonSizing / 4,
          backgroundImage: `url(${props.img})`,
        }}
        onClick={(e) => handleClick(e)}
      ></div>
    </div>
  );
}

export default Buttons;
