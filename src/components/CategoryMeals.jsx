import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";

const requestConfig = {};

export default function CategoryMeals() {
  const { categoryName } = useParams();
  const { data: allMeals, isLoading, error } = useHttp(
    "http://localhost:3000/meals", // Get all meals first
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  // Filter meals on the frontend
  const filteredMeals = allMeals.filter((meal) => meal.category === categoryName);

  return (
    <div>
      <h2 className="category-title">{categoryName}</h2>
      <ul id="meals">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)
        ) : (
          <p className="center">No meals found in this category.</p>
        )}
      </ul>
    </div>
  );
}
