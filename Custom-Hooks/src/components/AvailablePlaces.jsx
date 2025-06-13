import { useState, useEffect,useCallback } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';


async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  console.log('AvailablePlaces')

//  const fetchSortedPlaces= useCallback(async function fetchSortedPlaces() {
// //await func yield promise obj
//     const places = await fetchAvailablePlaces();
//     return new Promise((resolve) => {
    
//       navigator.geolocation.getCurrentPosition((position) => {
//         const sortedPlaces = sortPlacesByDistance(
//           places,
//           position.coords.latitude,
//           position.coords.longitude
//         );

//           resolve(sortedPlaces); // sortedPlaces will be returned by fetchSortedPlaces function: logic of javascript all this code
//         //approach for converting a non-promise feature and API into a promise-based feature.
//       });
     
//     });


//   });

  const { 
    isFetching,
    error,
    fetchData: availablePlaces
  //  setFetchData: setAvailablePlaces,
    
  } = useFetch(fetchSortedPlaces, []); //fetchData:fetchPlaces create alias fetchPlaces for fetchData

  //} = useFetch(fetchAvailablePlaces, []); //fetchData:fetchPlaces create alias fetchPlaces for fetchData




  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
