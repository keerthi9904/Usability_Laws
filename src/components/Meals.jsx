import { Link } from "react-router-dom";
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

// Correct category list
const categories = [
  "Pasta & Rice Dishes",
  "Pizza & Burgers",
  "Salads & Bowls",
  "Sandwiches & Wraps",
  "Meat & Seafood",
  "Soups & Stews",
  "Desserts"
];

export default function Meals() {
  const { data: loadedMeals, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <div>
      <div className="category-container">
        {categories.map((category) => (
          <Link key={category} to={`/main/category/${category}`} className="category-tile">
            {category}
          </Link>
        ))}
      </div>

      <ul id="meals">
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </div>
  );
}
