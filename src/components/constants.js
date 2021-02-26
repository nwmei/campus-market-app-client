import React from 'react';

export const neighborhoods = {
  "bu": [
    {id: 'Warren Towers', title: 'Warren Towers'},
    {id: 'West Campus', title: 'West Campus'},
    {id: 'Danielsen Hall', title: 'Danielsen Hall'},
    {id: 'South Campus', title: 'South Campus'},
    {id: 'Bay State Road', title: 'Bay State Road'},
    {id: 'Myles Standish', title: 'Myles Standish'},
    {id: 'Stuvi', title: 'Stuvi'},
  ],
  "Off-Campus": [
    {id: 'East Coast', title: 'East Coast'},
    {id: 'West Coast', title: 'West Coast'},
  ],
  "northeastern": [
    {id: 'campus wide', title: 'campus wide'},
  ],
  "umass": [
    {id: 'campus wide', title: 'campus wide'},
  ],
  "mit": [
    {id: 'campus wide', title: 'campus wide'},
  ],
  "bentley": [
    {id: 'campus wide', title: 'campus wide'},
  ],
  "mcphs": [
    {id: 'campus wide', title: 'campus wide'},
  ],
};

export const campusPairs = {
  'off-campus': {
    id: 'off-campus',
    title: 'Off-Campus'
  },
  'bu': {
    id: 'bu', title: 'Boston University'
  },
  'neu': {
    id: 'neu', title: 'Northeastern U'
  },
  'umass': {
    id: 'umass', title: 'Umass Amherst'
  },
  'mit': {
    id: 'mit', title: 'MIT'
  },
  'bentley': {
    id: 'bentley', title: 'Bentley University'
  },
  'mcphs': {
    id: 'mcphs', title: 'MCPHS'
  }
};

const generateCampusOptions = () => {
  let result = [];
  for (let campusKey in campusPairs) {
    result.push(campusPairs[campusKey]);
  }
  return result;
};

export const campuses = generateCampusOptions();

export const categories = [
  {id: 'furniture', title: 'furniture'},
  {id: 'books', title: 'books'},
  {id: 'electronics', title: 'electronics'},
  {id: 'food', title: 'food'},
  {id: 'drinks', title: 'drinks'},
  {id: 'other', title: 'other'},
];

export const pageSize = 20;

//export const gradientColor = '#33ab9f';

export const gradientColor = '#3d5afe';

//export const gradientColor = 'linear-gradient(45deg, #ff1744  30%,  #ffc107 90%)';