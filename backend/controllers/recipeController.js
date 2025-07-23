

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;


const MOCK_RECIPE = `
## Mock Recipe Title
Ingredients:
- Tomato (2)
- Onion (1)
- Cucumber (1)
- Salt, pepper, oil

Instructions:
1. Chop all vegetables.
2. Mix in a bowl.
3. Add salt, pepper, and a dash of oil.
4. Toss well and serve cold.

*Tip: Add lemon juice for extra freshness!*`;

const generateRecipe = async (req, res) => {
  const { ingredients } = req.body;

  
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Ingredients are required." });
  }

  const prompt = `
    Create a unique, healthy, and delicious recipe using only these ingredients: ${ingredients.join(", ")}.
    Include:
    - A creative recipe title
    - A complete list of ingredients with quantities
    - Step-by-step instructions
    - Optional: Serving suggestions or tips

    Please format your answer clearly for easy reading.
  `;

  // If you have no API key, use mock (for dev/testing)
  // BE SURE TO SET YOUR REAL KEY IN PRODUCTION!
  if (!PERPLEXITY_API_KEY) {
    console.warn("No PERPLEXITY_API_KEY set—using mock recipe. See docs.perplexity.ai.");
    return res.json({ recipe: MOCK_RECIPE });
  }

  // Call Perplexity API (as per docs.perplexity.ai/docs/getting-started)
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "pplx-7b-online", // You can use pplx-7b-chat, pplx-70b-chat, etc.
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 700,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("Perplexity API error:", await response.text());
      return res.status(500).json({ error: "Failed to generate recipe (API error)." });
    }

    const data = await response.json();
    const recipe = data.choices[0].message.content;
    res.json({ recipe });
  } catch (error) {
    console.error("Perplexity API error:", error);
    res.status(500).json({ error: "Failed to generate recipe (server error)." });
  }
};

module.exports = { generateRecipe };
