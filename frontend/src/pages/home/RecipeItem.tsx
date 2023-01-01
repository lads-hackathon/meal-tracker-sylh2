import { For } from "solid-js";
import { Recipe } from "../../schemas";

export default function RecipeItem(props: Recipe) {
    return (
        <div>
            <h2>{props.recipe_name}</h2>
            <img src={props.image_link} />

            <h3>Ingredients</h3>

            <ul>
                <For each={props.ingredients}>
                    { (ingredient: string, i) => (
                        <li>{ingredient}</li>
                    ) }
                </For>
            </ul>
        </div>
    )
}