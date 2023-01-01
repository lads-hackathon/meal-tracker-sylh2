import { Accessor, createEffect, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { InfoIcon, TrashIcon } from "../../icons";
import { FoodNutritionFacts, Meal } from "../../schemas";

import styles from './FoodEntry.module.css';

interface FoodEntryProps {
    item: FoodNutritionFacts;
    meal: Meal;
    showInfoBox: (food: FoodNutritionFacts) => void;
    deleteCallback: () => void;
    index: Accessor<number>;
}

export default function FoodEntry(props: FoodEntryProps) {
    return (
        <div class={styles.foodEntry}>
            <img src={props.item.info.image} alt={`Image of ${props.item.name}`} loading="lazy" />

            <div class={styles.resultText}>
                <h3>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)} ({props.item.info.group})</h3>
                <p>Serving size: {props.item.nutrition.serving_size_grams}g</p>

                <div class={styles.icons}>
                    <InfoIcon onClick={ () => props.showInfoBox(props.item) } style="cursor: pointer;" />
                    <TrashIcon onClick={ props.deleteCallback } style="cursor: pointer;" />
                </div>
            </div>
        </div>
    )
}