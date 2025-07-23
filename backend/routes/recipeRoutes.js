const express = require("express");
const router = express.Router();
const { generateRecipe } = require("../controllers/recipeController");

router.post("/generate-recipe", generateRecipe);

module.exports = router;
