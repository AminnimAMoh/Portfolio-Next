import React, { useRef } from "react";
import useStyle from "../../../styles/ContentContainer_style";
import { useSelector } from "react-redux";
import { RootState } from "../../../Shared_Components/store";
import dynamic from "next/dynamic";
import Loading from "../Loading";
import Image from "next/image";
import MobileContainer from "/public/images/Containers/Content_Frame/Mobile.png";

const UX = dynamic(() => import("../Pages/UX"), { loading: () => <Loading /> });
const UI = dynamic(() => import("../Pages/UI"), { loading: () => <Loading /> });
const CV = dynamic(() => import("../Pages/CV"), { loading: () => <Loading /> });
const D3 = dynamic(() => import("../Pages/D3"), { loading: () => <Loading /> });
const Undeveloped = dynamic(() => import("../Pages/Undeveloped"), {
  loading: () => <Loading />,
});
// const MobileContainer=dynamic(()=>import("../../../public/images/Containers/"),{loading: ()=> <Loading/>});

// import D3 from "../Pages/D3";

function RenderObject(state: any): React.ReactElement {
  switch (state.state) {
    case "UX":
      return <UX />;
    case "UI":
      return <UI />;
    case "CV":
      return <CV />;
    case "D3":
      return <D3 />;
    default:
      return <Undeveloped />;
  }
}

function ContentContainer(): React.ReactElement {
  const classes = useStyle();
  const rootDetails = useRef<HTMLDivElement>(null);
  const scrollToTop = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    rootDetails.current &&
    scrollToTop.current &&
    rootDetails.current.scrollTop > 800
      ? scrollToTop.current?.classList.add("open")
      : scrollToTop.current?.classList.remove("open");
  };

  const handleClick = () => {
    rootDetails.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const {
    buttonAction: { rootState, delayState, renderPage },
    screenAction: { screenState },
  } = useSelector((state: RootState) => state);

  return (
    <div
      onScroll={handleScroll}
      ref={rootDetails}
      className={
        rootState && screenState === "wide"
          ? `${classes.root} open`
          : rootState && screenState === "limited"
          ? `${classes.root} open_vertically`
          : !rootState && delayState && screenState === "wide"
          ? `${classes.root} close`
          : !rootState && delayState && screenState === "limited"
          ? `${classes.root} close_vertically`
          : screenState === "limited"
          ? `${classes.root} close_vertically`
          : classes.root
      }
      style={
        rootState && !delayState && screenState === "wide"
          ? { width: "100%" }
          : !rootState && delayState && screenState === "wide"
          ? { width: "0%" }
          : rootState && !delayState && screenState === "limited"
          ? { height: "100%" }
          : !rootState && delayState && screenState === "limited"
          ? { height: "0%" }
          : {}
      }
    >
      <div
        ref={scrollToTop}
        className={classes.scrollToTop}
        onClick={handleClick}
      >
        <div />
      </div>
      <div className={classes.MobileFrame}>
        <Image src={MobileContainer} alt="content" />
      </div>
      <RenderObject state={renderPage} />
    </div>
  );
}

export default ContentContainer;
