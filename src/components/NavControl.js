import React, { useState } from "react";

function NavControl(props) {
  const options = document.querySelectorAll(".NavItems");
  const filterBox = document.getElementById("filter-box");
  const state = document.getElementById("state");
  const city = document.getElementById("city");

  let cities = removeDuplicates(props.cityList.sort());
  let states = removeDuplicates(props.stateList.sort());
  let nearest = props.nearest;
  let rides = props.rides;
  let selectedState = "";
  let selectedCity = "";
  let toggleOptions = [];
  let currentOption = [];
  let filteredData = [];

  function validateLocation(ele) {
    if (ele.state === selectedState || ele.city === selectedCity) {
      return true;
    } else {
      return false;
    }
  }

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  function handleFilterBox() {
    filterBox.classList.toggle("hide");
  }

  function handleClick(e) {
    options.forEach((option) => {
      toggleOptions.push(option.childNodes);
    });

    toggleOptions.forEach((option) => {
      option.forEach((item) => {
        item.classList.remove("active");
      });
    });

    currentOption = e.target;
    currentOption.classList.add("active");

    // Selection of Nearest , Upcoming , Past Rides
    if (e.target.textContent === "Past rides") {
      props.sendIsPast(true);
      props.sendIsUpcoming(false);
      props.sendIsNearest(false);
      props.sortPast();
    } else if (e.target.textContent === "Upcoming rides") {
      props.sendIsUpcoming(true);
      props.sendIsPast(false);
      props.sendIsNearest(false);
      props.sortUpcoming();
    } else {
      props.sendIsNearest(true);
      props.sendIsUpcoming(false);
      props.sendIsPast(false);
      props.sortNearest();
    }
  }

  const handleFilter = (e) => {
    selectedCity = city.options[city.selectedIndex].text;
    selectedState = state.options[state.selectedIndex].text;

    if (selectedState === "State" && selectedCity === "City") {
      filteredData = props.rides;
      props.sendFilteredData(filteredData);
    } else if (selectedState !== "State" || selectedCity !== "City") {
      filteredData = nearest.filter(validateLocation);
      props.sendFilteredData(filteredData);
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
              <option value="State">State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="filterItem">
            <select name="city" id="city" onChange={handleFilter}>
              <option value="City">City</option>
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
