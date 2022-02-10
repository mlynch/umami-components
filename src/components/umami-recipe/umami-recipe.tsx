import { Component, Prop, State, h, Host } from '@stencil/core';

interface Recipe {
  title: string;
  field_ingredients: string[];
  field_number_of_servings: number;
  field_preparation_time: number;
  field_cooking_time: number;
  field_recipe_instruction: FieldValue;
  field_summary: FieldValue;
}

interface FieldValue {
  value: string;
  format: 'basic_html' | string;
};

@Component({
  tag: 'umami-recipe',
  styleUrl: 'umami-recipe.css',
  shadow: true,
})
export class UmamiRecipe {
  /**
   * The first name
   */
  @Prop() recipeId: string;

  @State() recipe: Recipe | null = null;
  @State() recipeImage: string | null = null;

  async componentDidLoad() {
    const res = await fetch(`http://127.0.0.1:8888/jsonapi/node/recipe/${this.recipeId}?include=field_media_image.field_media_image`);

    const data = await res.json();

    console.log(data);

    this.recipe = (data as any).data.attributes;

    this.recipeImage = `http://localhost:8888${(data as any).included[1].attributes.uri.url}`;
  }

  render() {
    return (
      <Host>
        {this.recipe ? (
          <RecipeBox recipe={this.recipe} recipeImage={this.recipeImage} />
        ) : null}
      </Host>
    )
  }
}

const RecipeBox = ({ recipe, recipeImage }: { recipe: Recipe, recipeImage: string }) => {
  console.log(recipe);
  const {
    title,
    field_number_of_servings,
    field_ingredients,
    field_recipe_instruction,
    field_cooking_time,
    field_preparation_time
  } = recipe;

  return (
    <div class="recipe">
      <div class="recipe__wrapper">
        <h2 class="recipe__title">{title}</h2>
        <img class="recipe__image" src={recipeImage} />
        <h4>Servings: {field_number_of_servings}</h4>
        <h4>Cook time: {field_cooking_time}</h4>
        <h4>Prep time: {field_preparation_time}</h4>
        <h4>Servings: {field_number_of_servings}</h4>
        <div class="recipe__data">
          <ul class="recipe__ingredients">
            {field_ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p class="recipe__instructions" innerHTML={field_recipe_instruction.value} />
        </div>
      </div>
    </div>
  );
}
