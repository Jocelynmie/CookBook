class Ingredient {
  constructor(name, amount, unit) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}

class Recipe {
  constructor(
    name,
    description,
    cookTime,
    ingredients = [],
    instructions = ""
  ) {
    this.name = name;
    this.description = description;
    this.cookTime = cookTime;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.createdAt = new Date();
  }
}
