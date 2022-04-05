import React from "react";

function Rides(props) {
  var date = props.date;
  date = new Date(date);
  var dateString = date.toLocaleDateString();

  var dest = props.destination_station_code;
  var station = props.station_code;
  var distance = 0;
  if (dest > station) {
    distance = dest - station;
  } else {
    distance = station - dest;
  }

  var station_path = props.station_path;
  station_path = "[" + station_path.join(", ") + "]";

  return (
    <div className="container">
      <div className="RideDetails">
        <img src={props.map_url} alt="map" className="map" />
        <div className="details">
          <span>Ride Id : {props.id}</span>
          <span>Origin Station : {props.origin_station}</span>
          <span>station_path : {station_path}</span>
          <span>Date : {dateString}</span>
          <span>Distance : {distance}</span>
          <div className="location">
            <div className="city">{props.city}</div>
            <div className="state">{props.state}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rides;
