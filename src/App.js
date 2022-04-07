import Header from "./components/Header";
import NavControl from "./components/NavControl";
import Rides from "./components/Rides";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const ridesApi = "https://assessment.api.vweb.app/rides";
  const usersApi = "https://assessment.api.vweb.app/user";

  const [filteredData, setFilteredData] = useState([]);
  let [isNearest, setIsNearest] = useState(true);
  let [isUpcoming, setIsUpcoming] = useState(false);
  let [isPast, setIsPast] = useState(false);
  const [isFilteredData, setIsFilteredData] = useState([]);

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
  let rides = data;

  const [nearestArray, setNearestArray] = useState([]);
  const [pastRidesArray, setPastRidesArray] = useState([]);
  const [upComingArray, setUpComingArray] = useState([]);

  const userLocation = user.station_code;
  const ride_data = rides;

  const sendFilteredData = (data) => {
    setFilteredData(data);
  };

  // For addding cities and states to the dropdown
  setTimeout(() => {
    return sortNearest();
  }, 500);

  function isFiltered(e) {
    if (e.target.selected) {
      setIsFilteredData(true);
    } else {
      setIsFilteredData(false);
    }
  }

  function getActiveTab(e) {
    if (e.target.textContent === "Nearest rides") {
      setIsNearest(true);
      setIsUpcoming(false);
      setIsPast(false);
      sortNearest();
    } else if (e.target.textContent === "Upcoming rides") {
      setIsNearest(false);
      setIsUpcoming(true);
      setIsPast(false);
      sortUpcoming();
    } else if (e.target.textContent === "Past rides") {
      setIsNearest(false);
      setIsUpcoming(false);
      setIsPast(true);
      sortPast();
    }
  }

  function sortNearest() {
    const closest = (arr, num) => {
      return (
        arr.reduce((acc, val) => {
          if (Math.abs(val - num) < Math.abs(acc)) {
            return val - num;
          } else {
            return acc;
          }
        }, Infinity) + num
      );
    };

    setNearestArray(
      [].slice.call(rides).sort((a, b) => {
        if (
          closest(a.station_path, userLocation) >
          closest(b.station_path, userLocation)
        ) {
          return 1;
        } else {
          return -1;
        }
      })
    );
  }

  function sortUpcoming() {
    setUpComingArray(
      ride_data.filter(
        (singleRide) => singleRide.date > new Date().toISOString().slice(0, 10)
      )
    );
  }

  function sortPast() {
    let sorted = ride_data.filter(
      (singleRide) => singleRide.date < new Date().toISOString().slice(0, 10)
    );
    setPastRidesArray(sorted);
  }

  return (
    <>
      <Header avatar={user.url} name={user.name} />
      <NavControl
        cityList={cities}
        stateList={states}
        sendFilteredData={sendFilteredData}
        isFiltered={isFiltered}
        getActiveTab={getActiveTab}
        sortPast={sortPast}
        sortUpcoming={sortUpcoming}
        rides={rides}
      />
      {isNearest
        ? nearestArray.map(
            (ride, index) => (
              (cities.push(ride.city), states.push(ride.state)),
              (
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
                  rides={rides}
                />
              )
            )
          )
        : null}
      {isUpcoming
        ? upComingArray.map(
            (ride, index) => (
              (cities.push(ride.city), states.push(ride.state)),
              (
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
                  rides={rides}
                />
              )
            )
          )
        : null}
      {isPast
        ? pastRidesArray.map(
            (ride, index) => (
              (cities.push(ride.city), states.push(ride.state)),
              (
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
                  rides={rides}
                />
              )
            )
          )
        : null}
      {isFilteredData
        ? Object.values(filteredData).map(
            (ride, index) => (
              (cities.push(ride.city), states.push(ride.state)),
              (
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
                  rides={rides}
                />
              )
            )
          )
        : null}
    </>
  );
}

export default App;
