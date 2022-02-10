/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface UmamiRecipe {
        /**
          * The first name
         */
        "recipeId": string;
    }
}
declare global {
    interface HTMLUmamiRecipeElement extends Components.UmamiRecipe, HTMLStencilElement {
    }
    var HTMLUmamiRecipeElement: {
        prototype: HTMLUmamiRecipeElement;
        new (): HTMLUmamiRecipeElement;
    };
    interface HTMLElementTagNameMap {
        "umami-recipe": HTMLUmamiRecipeElement;
    }
}
declare namespace LocalJSX {
    interface UmamiRecipe {
        /**
          * The first name
         */
        "recipeId"?: string;
    }
    interface IntrinsicElements {
        "umami-recipe": UmamiRecipe;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "umami-recipe": LocalJSX.UmamiRecipe & JSXBase.HTMLAttributes<HTMLUmamiRecipeElement>;
        }
    }
}
