import { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};
export default function Meals() {

    //const [loadedMeals, setLoadedMeals] = useState([]);

    // useEffect(() => {

    //     async function fetchMeals() {
    //         const resp = await fetch('http://localhost:3000/meals', { method: 'GET' }); //return promise

    //         if (!resp.ok) {

    //         }

    //         const meals = await resp.json();
    //         setLoadedMeals(meals); //this is hook and never change so don't use ext dependency in []
    //     }
    //     fetchMeals();
    // }, []);

    const { data: loadedMeals,
        isLoading,
        error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching meals..</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}