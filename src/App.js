import Header from "./components/Header";
import NavControl from "./components/NavControl";
import Rides from "./components/Rides";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const ridesApi = "https://assessment.api.vweb.app/rides";
  const usersApi = "https://assessment.api.vweb.app/user";

  const [filteredData, setFilteredData] = useState([]);
  const [filteredNearestData, setFilteredNearestData] = useState([]);
  const [filteredPastData, setFilteredPastData] = useState([]);
  let [isNearest, setIsNearest] = useState(true);
  let [isUpcoming, setIsUpcoming] = useState(false);
  let [isPast, setIsPast] = useState(false);

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
  let nearest = data;

  const [nearestArray, setNearestArray] = useState([]);
  const [pastRidesArray, setPastRidesArray] = useState([]);
  const [upComingArray, setUpComingArray] = useState([]);

  const userLocation = user.station_code;
  const ride_data = rides;

  const sendFilteredData = (data) => {
    setFilteredData(data);
  };
  const sendIsNearest = (data) => {
    setIsNearest(data);
  };
  const sendIsUpcoming = (data) => {
    setIsUpcoming(data);
  };
  const sendIsPast = (data) => {
    setIsPast(data);
  };

  // For addding cities and states to the dropdown

  Object.values(rides).map(
    (ride, index) => (cities.push(ride.city), states.push(ride.state))
  );

  setTimeout(() => {
    return sortNearest();
  }, 500);

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
      ride_data.sort((a, b) => {
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

  const sortPast = () => {
    setPastRidesArray(
      ride_data.filter(
        (singleRide) => singleRide.date < new Date().toISOString().slice(0, 10)
      )
    );
  };

  const sortUpcoming = () => {
    setUpComingArray(
      ride_data.filter(
        (singleRide) => singleRide.date > new Date().toISOString().slice(0, 10)
      )
    );
  };
  return (
    <>
      <Header avatar={user.url} name={user.name} />
      <NavControl
        cityList={cities}
        stateList={states}
        nearest={nearest}
        sendFilteredData={sendFilteredData}
        sendIsNearest={sendIsNearest}
        sendIsUpcoming={sendIsUpcoming}
        sendIsPast={sendIsPast}
        sortNearest={sortNearest}
        sortPast={sortPast}
        sortUpcoming={sortUpcoming}
        rides={rides}
      />
      {isNearest
        ? nearestArray.length > 0
          ? nearestArray.map((ride, index) => (
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
            ))
          : Object.values(filteredData).map((ride, index) => (
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
            ))
        : isUpcoming
        ? upComingArray.length > 0
          ? upComingArray.map((ride, index) => (
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
            ))
          : null
        : pastRidesArray.length > 0
        ? pastRidesArray.map((ride, index) => (
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
          ))
        : null}
    </>
  );
}

export default App;
