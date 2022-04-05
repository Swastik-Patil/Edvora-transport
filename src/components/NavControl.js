import React from "react";

function NavControl(props) {
  const handleClick = (e) => {
    const options = document.querySelectorAll(".NavItems");

    var toggleOptions = [];

    options.forEach((option) => {
      toggleOptions.push(option.childNodes);
    });

    toggleOptions.forEach((option) => {
      option.forEach((item) => {
        item.classList.remove("active");
      });
    });

    const currOption = e.target;
    currOption.classList.add("active");

    if (e.target.textContent === "Nearest rides") {
      console.log("Nearest rides");
    } else if (e.target.textContent === "Upcoming rides") {
      console.log("Upcoming rides");
    } else {
      console.log("Past rides");
    }
  };

  const handleFilterBox = () => {
    const filterBox = document.getElementById("filter-box");
    filterBox.classList.toggle("hide");
  };

  const cities = props.cities.sort();
  const states = props.states.sort();

  var selectedState = "";
  var selectedCity = "";

  const handleFilter = (e) => {
    var city = document.getElementById("city");
    selectedCity = city.options[city.selectedIndex].text;

    var state = document.getElementById("state");
    selectedState = state.options[state.selectedIndex].text;

    const rideContainers = document.querySelectorAll(".container");
    // console.log(rideContainers);

    if (selectedState === "State" && selectedCity === "City") {
      rideContainers.forEach((rideContainer) => {
        rideContainer.classList.remove("hide");
      });
    } else if (selectedState !== "State" || selectedCity === "City") {
      const states = [];
      rideContainers.forEach((rideContainer) => {
        if (
          document.querySelectorAll(".state")[0].textContent === selectedState
        ) {
          console.log(document.querySelectorAll(".state")[0].textContent);
        }
      });
    }
  };

  return (
    <div className="Navbar">
      <div className="NavItems">
        <div className="NavItem active" onClick={handleClick} id="near">
          Nearest rides
        </div>
        <div className="NavItem" onClick={handleClick} id="upcoming">
          Upcoming rides
        </div>
        <div className="NavItem" onClick={handleClick} id="past">
          Past rides
        </div>
      </div>
      <div className="filter">
        <div className="burger"></div>
        <div className="filterOptions" onClick={handleFilterBox}>
          Filters
        </div>
        <div className="filterBox hide" id="filter-box">
          <div className="filterTitle">Filters</div>
          <div className="filterItem">
            <select name="state" id="state" onChange={handleFilter}>
              <option value="">State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="filterItem">
            <select name="city" id="city" onChange={handleFilter}>
              <option value="">City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavControl;
