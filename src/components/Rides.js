import React from "react";

function Rides(props) {
  var date = props.date.toString();

  let arrDates = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];

  let monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Augt",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dateArr = date.split(" ");

  date = new Date(dateArr[0]);

  let time = dateArr[1] + " " + dateArr[2];

  let day = arrDates[date.getDate() - 1];
  let month = monthsArr[date.getMonth()];
  let year = date.getFullYear();

  let rideDate = day + " " + month + " " + year + " " + time;

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
          <span>Date : {rideDate}</span>
          <span>
            Distance : <span className="distance">{distance}</span>
          </span>
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
