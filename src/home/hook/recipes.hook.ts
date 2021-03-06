//vendors
import { useState } from "react";

//services
import { getRecipesData, getRecipeData } from "../services";

export const useRecipesData = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorRecipeData, setErrorRecipeData] = useState(false);
  const [successRecipeData, setSuccessRecipeData] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const loadRecipe = async (id: string) => {
    //@ts-ignore
    const existingRecipe = recipesData.filter((item) => item.idMeal === id);
    if (existingRecipe[0]) {
      setSelectedRecipe(existingRecipe[0]);
    } else {
      await fetchRecipeData(id);
    }
  };

  const fetchDataSuccess = (dataSuccess: any) => {
    setRecipesData(dataSuccess.meals.slice(0, 5));
    setSuccess(true);
  };

  const fetchDataError = (err: any) => {
    setSuccess(false);
    setError(err);
  };

  const loadRandomRecipes = async () => {
    setError(false);

    await getRecipesData()
      .then((response) => fetchDataSuccess(response))
      .catch((err) => fetchDataError(err));
  };

  const fetchRecipeDataSuccess = (dataSuccess: any) => {
    setSelectedRecipe(dataSuccess.meals[0] || null);
    setSuccessRecipeData(true);
  };

  const fetchRecipeDataError = (err: any) => {
    setSuccessRecipeData(false);
    setErrorRecipeData(err);
  };

  const fetchRecipeData = async (id: string) => {
    setErrorRecipeData(false);

    const response = await getRecipeData(id)
      .then((response) => fetchRecipeDataSuccess(response))
      .catch((err) => fetchRecipeDataError(err));
    return response;
  };

  return {
    error,
    errorRecipeData,
    loadRecipe,
    loadRandomRecipes,
    recipesData,
    selectedRecipe,
    success,
    successRecipeData,
  };
};
