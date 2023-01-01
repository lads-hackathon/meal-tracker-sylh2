import { For, onCleanup } from 'solid-js';
import { ChevronLeftIcon } from '../../icons';
import { FoodNutritionFacts, Recipe } from '../../schemas';
import styles from './InfoBox.module.css';
import RecipeItem from './RecipeItem';

interface InfoBoxProps {
    food: FoodNutritionFacts;
    close: () => void;
}

export default function InfoBox(props: InfoBoxProps) {
    const escapeKeyHandler = e => {
        if (e.key == 'Escape') {
            props.close();
        }
    };

    document.addEventListener('keydown', escapeKeyHandler);

    onCleanup(() => {
        document.removeEventListener('keydown', escapeKeyHandler);
    });

    return (
        <>
            <div class={styles.shadow} onClick={ props.close }></div>

            <div class={styles.content}>
                <div class={styles.bar}>
                    <ChevronLeftIcon onClick={ props.close } style="cursor: pointer; width: 42px;" />
                    <h1>{props.food.name.charAt(0).toUpperCase() + props.food.name.slice(1)}</h1>
                </div>
                
                <div class={styles.info}>
                    <h2>Nutrition facts ({props.food.nutrition.serving_size_grams}g)</h2>
                        
                    <div>
                        <p><strong>Calories</strong>: {props.food.nutrition.calories}</p>
                        <p><strong>Total fat</strong>: {props.food.nutrition.total_fat_grams}g</p>
                        <p>+ Saturated fat: {props.food.nutrition.saturated_fat_grams}g</p>
                        <p><strong>Cholesterol</strong>: {props.food.nutrition.cholesterol_milligrams}mg</p>
                        <p><strong>Sodium</strong>: {props.food.nutrition.sodium_milligrams}mg</p>
                        <p><strong>Total carbohydrate</strong>: {props.food.nutrition.total_carb_grams}g</p>
                        <p>+ Dietary fiber: {props.food.nutrition.dietary_fiber_grams}g</p>
                        <p>+ Total sugars: {props.food.nutrition.sugars_grams}g</p>
                        <p><strong>Protein</strong>: {props.food.nutrition.proteins_grams}g</p>
                    </div>
                    
                    <h2>Recommended recipes</h2>
                    <div class={styles.recipes}>
                        <For each={props.food.recipes}>
                            { (item: Recipe, i) => (
                                <RecipeItem {...item} />
                            ) }
                        </For>
                    </div>
                </div>
            </div>
        </>
    )
}