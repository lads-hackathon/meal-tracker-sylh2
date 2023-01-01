import { For, Show } from 'solid-js';
import { FoodNutritionFacts, Meal } from '../../schemas';
import FoodEntry from './FoodEntry';
import styles from './MealSection.module.css';

interface MealSectionProps {
    meal: Meal;
    onClick: (element: HTMLDivElement) => void;
}

export default function MealSection(props: MealSectionProps) {
    let searchTarget;

    return (
        <Show when={ props.meal.foods.length != 0 } fallback={
            <div class={styles.mealBox} onClick={ e => props.onClick(e.currentTarget) } style="cursor: pointer;">
                <h1>{props.meal.name}</h1>
                <p>+ Add food to meal</p>
            </div>
        }>
            <div class={`${styles.mealBox} ${styles.notEmpty}`} ref={searchTarget}>
                <div class={styles.food}>
                    <For each={ props.meal.foods }>
                        { (item: FoodNutritionFacts, i) => (
                            <FoodEntry item={item} />
                        ) }
                    </For>
                </div>

                <button onClick={ e => props.onClick(searchTarget) } class={styles.addToMeal} >+ Add food to meal</button>
            </div>
        </Show>
        
    )
}