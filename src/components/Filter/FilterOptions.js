import React from "react";
import {campuses, categories} from "../constants"

const FilterOptions = [
  {
    filterClass: "selection",
    filterType: "Campus",
    options: campuses
  },
  {
    filterClass: "selection",
    filterType: "Neighborhood",
    options: [] // determined in Filters.js
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