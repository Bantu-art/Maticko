// Mock LLM integration for development
export const InvokeLLM = async ({ prompt, response_json_schema }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response based on the expected schema
  return {
    filtered_products: [],
    suggestions: [
      "Fresh vegetables",
      "Organic fruits", 
      "Whole grain products",
      "Healthy snacks"
    ],
    meal_ideas: [
      "Mediterranean salad",
      "Quinoa bowl",
      "Smoothie ingredients"
    ]
  };
};