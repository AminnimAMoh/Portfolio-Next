import React, { ReactElement } from 'react'
import {useDispatch} from 'react-redux'
import useStyle from "../../../styles/MenuButton_style";
import {
    containerStateToggle
  } from "../../../Redux/redux/slices/buttonActionSlice";

interface Props {
    name: string;
    coordinates: {
        x: number;
        y: number;
    }
    buttonSizing :number;
    img: string;
    parentElement: React.RefObject<HTMLDivElement>
}

function Buttons({parentElement, name, coordinates: {x,y}, buttonSizing, img}: Props): ReactElement {
    const classes = useStyle();
    const dispatch=useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const payload = e.currentTarget.id;
        const parentChilrdernLength = parentElement.current?.childElementCount;
        const prentArray = parentElement.current?.children;
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
        className={classes.buttonContainers}
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <div
          id={name}
          className={classes.iconButtons}
          style={{
            width: buttonSizing / 4,
            height: buttonSizing / 4,
            backgroundImage: `url(${img})`,
          }}
          onClick={(e) => handleClick(e)}
        ></div>
      </div>
    )
}

export default Buttons
