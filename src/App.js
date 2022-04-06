import Header from "./components/Header";
import NavControl from "./components/NavControl";
import Rides from "./components/Rides";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const ridesApi = "https://assessment.api.vweb.app/rides";
  const usersApi = "https://assessment.api.vweb.app/user";

  useEffect(() => {
    const fetchData = async () => {
      fetch(usersApi)
        .then((response) => response.json())
        .then((response) => setUser(response))
        .catch((error) => console.log("error", error));

      fetch(ridesApi)
        .then((response2) => response2.json())
        .then((response2) => setData(response2))
        .catch((error) => console.log("error", error));
    };
    fetchData();
  }, []);

  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const cities = [];
  const states = [];

  const [filteredData, setFilteredData] = useState([]);

  let rides = data;
  let nearest = data;

  const sendFilteredData = (index) => {
    setFilteredData(index);
  };

  // For addding cities and states to the dropdown
  {
    Object.values(rides).map(
      (ride, index) => (cities.push(ride.city), states.push(ride.state))
    );
  }

  //
  const sortNearest = (arr) => {
    let container = document.getElementById("container");
    let distance = document.querySelectorAll(".distance");

    var distanceArr = [].slice.call(distance).sort(function (a, b) {
      return a.textContent > b.textContent ? 1 : -1;
    });
    distanceArr.forEach(function (p) {
      container.appendChild(p);
      console.log(p, arr);
    });
  };

  const sortPast = (index) => {
    console.log("Here");
    let currdate = new Date();
    console.log(currdate);

    let arr = index;
    console.log(arr);

    setFilteredData(index);
  };

  function sortUpcoming() {}

  return (
    <>
      <Header avatar={user.url} name={user.name} />
      <NavControl
        cityList={cities}
        stateList={states}
        nearest={nearest}
        sendFilteredData={sendFilteredData}
        sortNearest={sortNearest}
        sortPast={sortPast}
        sortUpcoming={sortUpcoming}
        rides={rides}
      />
      {filteredData.length > 0
        ? filteredData.map((ride, index) => (
            <Rides
              key={index}
              id={ride.id}
              origin_station={ride.origin_station_code}
              station_path={ride.station_path}
              date={ride.date}
              map_url={ride.map_url}
              city={ride.city}
              state={ride.state}
              destination_station_code={ride.destination_station_code}
              station_code={user.station_code}
            />
          ))
        : Object.values(rides).map((ride, index) => (
            <Rides
              key={index}
              id={ride.id}
              origin_station={ride.origin_station_code}
              station_path={ride.station_path}
              date={ride.date}
              map_url={ride.map_url}
              city={ride.city}
              state={ride.state}
              destination_station_code={ride.destination_station_code}
              station_code={user.station_code}
            />
          ))}
    </>
  );
}

export default App;
