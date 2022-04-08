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
    load();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  let [isNearest, setIsNearest] = useState(true);
  let [isUpcoming, setIsUpcoming] = useState(false);
  let [isPast, setIsPast] = useState(false);
  const [nearestArray, setNearestArray] = useState([]);
  const [pastRidesArray, setPastRidesArray] = useState([]);
  const [upComingArray, setUpComingArray] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const cities = [];
  const states = [];
  let rides = data;

  const userLocation = user.station_code;
  const ride_data = rides;

  let load = () => {
    if (!loaded) {
      sortNearest(filteredData);
      setLoaded(true);
    } else {
      return;
    }
  };

  // For addding cities and states to the dropdown
  function getActiveTab(e) {
    if (e.target.textContent === "Past rides") {
      setIsNearest(false);
      setIsUpcoming(false);
      setIsPast(true);
      sortPast(filteredData);
    } else if (e.target.textContent === "Upcoming rides") {
      setIsNearest(false);
      setIsUpcoming(true);
      setIsPast(false);
      sortUpcoming(filteredData);
    } else {
      setIsNearest(true);
      setIsUpcoming(false);
      setIsPast(false);
      sortNearest(filteredData);
    }
  }

  function sortNearest(e) {
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

    let sorted = [];

    if (e.length > 0) {
      sorted = [].slice.call(e).sort((a, b) => {
        if (
          closest(a.station_path, userLocation) >
          closest(b.station_path, userLocation)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      sorted = [].slice.call(rides).sort((a, b) => {
        if (
          closest(a.station_path, userLocation) >
          closest(b.station_path, userLocation)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    setNearestArray(sorted);
  }

  function sortUpcoming(e) {
    setUpComingArray(
      ride_data.filter(
        (singleRide) => singleRide.date > new Date().toISOString().slice(0, 10)
      )
    );
  }

  function sortPast(e) {
    let sorted = [];
    if (e.length > 0) {
      sorted = e.filter(
        (singleRide) => singleRide.date < new Date().toISOString().slice(0, 10)
      );
    } else {
      sorted = ride_data.filter(
        (singleRide) => singleRide.date < new Date().toISOString().slice(0, 10)
      );
    }
    setPastRidesArray(sorted);
  }

  return (
    <>
      <Header avatar={user.url} name={user.name} />
      <NavControl
        cityList={cities}
        stateList={states}
        getActiveTab={getActiveTab}
        sortNearest={sortNearest}
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
    </>
  );
}

export default App;
