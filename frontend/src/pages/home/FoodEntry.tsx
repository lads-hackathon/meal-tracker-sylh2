import { Link } from "@solidjs/router";
import { ChevronRightIcon, InfoIcon, TrashIcon } from "../../icons";
import { FoodNutritionFacts } from "../../schemas";

import styles from './FoodEntry.module.css';

interface FoodEntryProps {
    item: FoodNutritionFacts;
}

export default function FoodEntry(props: FoodEntryProps) {
    return (
        <div class={styles.foodEntry}>
            <img src={props.item.info.image} alt={`Image of ${props.item.name}`} loading="lazy" />

            <div class={styles.resultText}>
                <h3>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)} ({props.item.info.group})</h3>
                <p>Serv. size {props.item.nutrition.serving_size_grams}g / Cals {props.item.nutrition.calories} </p>

                <div class={styles.icons}>
                    <InfoIcon />
                    <TrashIcon />
                </div>
            </div>
        </div>
    )
}