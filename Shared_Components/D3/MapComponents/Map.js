import {
    geoLocations,
  } from "../../../Shared_Components/D3/D3-Executables/utilities";

const SVGMAP=(container, data)=>{
  // console.log(data);
    const mapContainer=container.append("g")
    .attr("id", "mapContainer")
    .attr('transform', "translate(-710,-175)");

    let names = [];
    if (data) {
      for (let i = 0; i < data.features.length; i++) {
        names.push(data.features[i].properties.NAME_4);
      }
      mapContainer
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", (d) => geoLocations(d));
    }
}

export default SVGMAP