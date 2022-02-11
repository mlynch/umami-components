import { Component, Prop, State, h, Host } from '@stencil/core';

interface Recipe {
  title: string;
  field_ingredients: string[];
  field_number_of_servings: number;
  field_preparation_time: number;
  field_cooking_time: number;
  field_recipe_instruction: FieldValue;
  field_difficulty: FieldValue;
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
    const host = 'http://ddba-75-100-202-188.ngrok.io/'; // http://127.0.0.1:8888
    const res = await fetch(`${host}/jsonapi/node/recipe/${this.recipeId}?include=field_media_image.field_media_image`);

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
    field_preparation_time,
    field_difficulty
  } = recipe;

  return (
    <div class="recipe">
      <div class="recipe__wrapper">
        <img class="recipe__image" src={recipeImage} />
        <div class="recipe__content">
          <h2 class="recipe__title">{title}</h2>
          <div class="recipe__meta">
            <h4><FoodIcon /> Servings: {field_number_of_servings}</h4>
            <h4><AlarmIcon /> Cook time: {field_cooking_time}</h4>
            <h4><TimeIcon /> Prep time: {field_preparation_time}</h4>
            <h4><SpeedometerIcon /> Difficulty: {field_difficulty}</h4>
          </div>
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
    </div>
  );
}

const AlarmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Alarm</title><path d="M416.07 272a160 160 0 10-160 160 160 160 0 00160-160zM142.12 91.21A46.67 46.67 0 00112 80l-2.79.08C83.66 81.62 64 104 64.07 131c0 13.21 4.66 19.37 10.88 27.23a4.55 4.55 0 003.24 1.77h.88a3.23 3.23 0 002.54-1.31L142.38 99a5.38 5.38 0 001.55-4 5.26 5.26 0 00-1.81-3.79zM369.88 91.21A46.67 46.67 0 01400 80l2.79.08C428.34 81.62 448 104 447.93 131c0 13.21-4.66 19.37-10.88 27.23a4.55 4.55 0 01-3.24 1.76h-.88a3.23 3.23 0 01-2.54-1.31L369.62 99a5.38 5.38 0 01-1.55-4 5.26 5.26 0 011.81-3.79z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256.07 160v112h-80M416.07 432l-40-40M96.07 432l40-40"/></svg>
);

const TimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Time</title><path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 128v144h96"/></svg>
);

const FoodIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Fast Food</title><path d="M322 416c0 35.35-20.65 64-56 64H134c-35.35 0-56-28.65-56-64M336 336c17.67 0 32 17.91 32 40h0c0 22.09-14.33 40-32 40H64c-17.67 0-32-17.91-32-40h0c0-22.09 14.33-40 32-40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path d="M344 336H179.31a8 8 0 00-5.65 2.34l-26.83 26.83a4 4 0 01-5.66 0l-26.83-26.83a8 8 0 00-5.65-2.34H56a24 24 0 01-24-24h0a24 24 0 0124-24h288a24 24 0 0124 24h0a24 24 0 01-24 24zM64 276v-.22c0-55 45-83.78 100-83.78h72c55 0 100 29 100 84v-.22M241 112l7.44 63.97" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path d="M256 480h139.31a32 32 0 0031.91-29.61L463 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 112l16-64 47-16"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M224 112h256"/></svg>
);

const SpeedometerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Speedometer</title><path d="M326.1 231.9l-47.5 75.5a31 31 0 01-7 7 30.11 30.11 0 01-35-49l75.5-47.5a10.23 10.23 0 0111.7 0 10.06 10.06 0 012.3 14z"/><path d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0056.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0037.1-.1 173.13 173.13 0 01254.8 0 25.19 25.19 0 0037.1.1l3.2-3.5A223.18 223.18 0 00480 287.9C480 164.2 379.7 64 256 64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 128v32M416 288h-32M128 288H96M165.49 197.49l-22.63-22.63M346.51 197.49l22.63-22.63"/></svg>
);