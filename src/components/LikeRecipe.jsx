import axios from "axios";

const ApiUrl = import.meta.env.VITE_BACKEND_API_URI;

export const LikeRecipe = async (recipeId, token) => {
  try {
    const res = await axios.put(
      `${ApiUrl}/recipe/${recipeId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Return updated like info
    return {
      success: true,
      likesCount: res.data.likesCount,
      likes: res.data.likes,
      message: res.data.message,
    };
  } catch (error) {
    console.error("Error liking recipe:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Something went wrong" };
  }
};
