import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";

const requestConfig = {};

export default function CategoryMeals() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(`http://localhost:3000/meals`, requestConfig, []);

  function handleBackClick() {
    navigate("/main"); // Navigate back to the main page
  }


  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  // Filter meals on the frontend
  const filteredMeals = loadedMeals.filter((meal) => meal.category === categoryName);

  return (
    <div>
      <div className="category-header">
        <button className="back-button" onClick={handleBackClick}>
          <AiOutlineArrowLeft size={24} />
        </button>
        <h2 className="category-title">{categoryName}</h2>
      </div>
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
