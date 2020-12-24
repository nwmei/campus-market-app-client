import React from "react";
import {campuses, neighborhoods, categories} from "../constants"

const FilterOptions = [
  {
    filterClass: "selection",
    filterType: "Campus",
    options: campuses
  },
  {
    filterClass: "selection",
    filterType: "Neighborhood",
    options: neighborhoods["bu"]
  },
  {
    filterClass: "range",
    filterType: "Price",
  },
  {
    filterClass: "selection",
    filterType: "Category",
    options: categories
  },
];

export default FilterOptions;