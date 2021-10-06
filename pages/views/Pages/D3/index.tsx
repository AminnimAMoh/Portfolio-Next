import React, { useRef, useEffect, useState } from "react";
import { select, Selection } from "d3-selection";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnnualrainData,
  fetchSlumsData,
  fetchPopulationData,
  fetchMonthData,
  fetchMap,
} from "../../../redux/slices/fetchSlice";
import { RootState } from "../../../../Shared_Components/store";
import useStyle from "./styles";

interface viewBoxSetups {
  mobile: { map: string; UI: string };
  desktop: { map: string; UI: string };
}

function D3(): React.ReactElement {
  const {
    dataStore: { annualrain, slums, population, months, mapJSON, refresh },
  } = useSelector((state: RootState) => state);
  const classes = useStyle();
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mapSVG = useRef<SVGSVGElement | null>(null);
  const [svgSetupTrigger, setSVGSetupTrigger] = useState<boolean>(false);
  const windowState = useMediaQuery("(max-width:600px)");
  const viewBoxesSetup: viewBoxSetups = {
    desktop: { map: "-1 0 25 25", UI: "-140 0 1000 1000" },
    mobile: { map: "1.3 0 20 20", UI: "-45 0 800 800" },
  };

  const [svg, setSvg] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const [mapSVGState, setMapSVGState] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (annualrain.state === "empty") dispatch(fetchAnnualrainData());
    if (slums.state === "empty") dispatch(fetchSlumsData());
    if (population.state === "empty") dispatch(fetchPopulationData());
    if (months.state === "empty") dispatch(fetchMonthData());
    if (mapJSON.state === "empty") dispatch(fetchMap());

    if (annualrain.state === "rejected" && refresh)
      dispatch(fetchAnnualrainData());
    if (slums.state === "rejected" && refresh) dispatch(fetchSlumsData());
    if (population.state === "rejected" && refresh)
      dispatch(fetchPopulationData());
    if (months.state === "rejected" && refresh) dispatch(fetchMonthData());
    if (mapJSON.state === "rejected" && refresh) dispatch(fetchMap());
  }, [
    refresh,
    annualrain.state,
    slums.state,
    population.state,
    months.state,
    mapJSON.state,
    dispatch,
  ]);

  useEffect(() => {
    annualrain.state === "fulfilled" &&
      slums.state === "fulfilled" &&
      population.state === "fulfilled" &&
      months.state === "fulfilled" &&
      mapJSON.state === "fulfilled" &&
      setSVGSetupTrigger(true);
  }, [
    annualrain.state,
    slums.state,
    population.state,
    months.state,
    mapJSON.state,
  ]);

  useEffect(() => {
    !svg && svgSetupTrigger && setSvg(select(svgRef.current));
    if (annualrain.data.length > 0 && svg) {
      import(/* webpackChunkName: 'D3-Draw' */ "../../../../Shared_Components/D3/Draw").then(
        ({ default: Draw }) => {
          Draw(
            svg,
            svgRef,
            annualrain,
            slums,
            population,
            months,
            mapJSON.data
          );
        }
      );
    }

    !mapSVGState && svgSetupTrigger && setMapSVGState(select(mapSVG.current));
    if (mapJSON.data && mapSVGState) {
      import(/* webpackChunkName: 'D3-mapSVG' */ "../../../../Shared_Components/D3/MapComponents/Map").then(
        ({ default: SVGMAP }) => {
          SVGMAP(mapSVGState, mapJSON.data);
        }
      );
    }
  }, [
    svg,
    svgSetupTrigger,
    annualrain,
    slums,
    population,
    months,
    mapJSON,
    mapSVGState,
  ]);

  return (
    <div className={classes.root}>
      <svg
        ref={mapSVG}
        viewBox={
          windowState ? viewBoxesSetup.mobile.map : viewBoxesSetup.desktop.map
        }
      />
      <svg
        ref={svgRef}
        viewBox={
          windowState ? viewBoxesSetup.mobile.UI : viewBoxesSetup.desktop.UI
        }
      />
    </div>
  );
}

export default D3;
