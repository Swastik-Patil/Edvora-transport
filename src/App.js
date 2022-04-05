import Header from "./components/Header";
import NavControl from "./components/NavControl";
import Rides from "./components/Rides";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [rides, setRides] = useState("");
  const [user, setUser] = useState("");

  const cities = [];
  const states = [];

  useEffect(() => {
    const ridesApi = "https://assessment.api.vweb.app/rides";
    const usersApi = "https://assessment.api.vweb.app/user";

    const fetchData = async () => {
      fetch(usersApi)
        .then((response) => response.json())
        .then((response) => setUser(response))
        .catch((error) => console.log("error", error));

      fetch(ridesApi)
        .then((response2) => response2.json())
        .then((response2) => setRides(response2))
        .catch((error) => console.log("error", error));
    };

    fetchData();
  }, []);

  return (
    <>
      <Header avatar={user.url} name={user.name} />
      <NavControl cities={cities} states={states} />
      {rides.length > 0 ? (
        rides.map(
          (ride, index) => (
            cities.push(ride.city),
            states.push(ride.state),
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
              />
            )
          )
        )
      ) : (
        <div className="loader">Loading...</div>
      )}
    </>
  );
}

export default App;
