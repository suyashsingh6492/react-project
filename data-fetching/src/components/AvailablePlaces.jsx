import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'
export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        //const resp = await fetch('http://localhost:3000/places_invalid'); //yeild promise
        
        const respData = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlace = sortPlacesByDistance(respData.places,
            position.coords.latitude,
            position.coords.longitude);
          setAvailablePlaces(sortedPlace);
          setIsFetching(false);


        });

      } catch (error) {
        //
        setError({ message: error.message || 'Could not fetch places, Please try again' });
        setIsFetching(false);

      }


    }
    fetchPlaces();

    // fetch('http://localhost:3000/places')
    //   .then((resp) => {
    //     return resp.json()
    //   }).then((respData) => {
    //     setAvailablePlaces(respData.places);
    //   });
  }, []);


  if (error) {
    return <ErrorPage title="An Error Occured" message={error.message} />;
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
