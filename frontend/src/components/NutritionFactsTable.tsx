import { FoodNutritionFacts } from '../schemas';
import styles from './NutritionFactsTable.module.css';


export default function NutritionFactsTable(props: FoodNutritionFacts) {
    return (
        <div class={styles.table}>
            <h1>Nutrition Facts</h1>

            <div>
                <h2>Calories</h2>
                <h2>{props.nutrition.calories}</h2>
            </div>
        </div>
    )
}