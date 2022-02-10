import { Component, Prop, State, h, Host } from '@stencil/core';

interface Recipe {
  title: string;
  field_ingredients: string[];
  field_number_of_servings: number;
  field_preparation_time: number;
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

  async componentDidLoad() {
    const res = await fetch(`http://127.0.0.1:8888/jsonapi/node/recipe/${this.recipeId}`);

    this.recipe = (await res.json() as any).data.attributes;
  }

  render() {
    if (!this.recipe) {
      return null;
    }
    const { title, field_recipe_instruction } = this.recipe;
    return (
      <Host>
        <div class="recipe">
          <div class="recipe__wrapper">
            <h2>{title}</h2>
            <p innerHTML={field_recipe_instruction.value} />
          </div>
        </div>
      </Host>
    )
  }
}
