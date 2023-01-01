import { createEffect, createSignal, onMount } from 'solid-js';
import { Link } from '@solidjs/router';
import { Store } from 'solid-js/store';
import { Meal, BodyInfo } from '../../schemas';
import styles from './SummarySection.module.css';

interface SummarySectionProps {
    title: string;
    mealArray: Store<Meal[]>;
    body: Store<BodyInfo>;
}

export default function SummarySection(props: SummarySectionProps) {
    const [ total, setTotal ] = createSignal(0);
    const [ rec, setRec ] = createSignal(0);

    createEffect(() => {
        let totalBuffer = 0;
        props.mealArray.forEach( (meal) => {
            meal.foods.forEach( (element) => {
                switch (props.title) {
                    case 'Calories':
                        totalBuffer += element.nutrition.calories;
                        break;

                    case 'Carbohydrates':
                        totalBuffer += element.nutrition.total_carb_grams;
                        break;

                    case 'Fats':
                        totalBuffer += element.nutrition.total_fat_grams;
                        break;
                }
            });
        });
        
        setTotal(totalBuffer);
    });

    createEffect(() => {
        let recBuffer = 0;

        let heightBuffer = props.body.centimeters;
        if (!props.body.centimeters) {
            heightBuffer = (props.body.feet * 12) + props.body.inches;
        }

        switch(props.title) {
            case 'Calories':
                recBuffer = ((props.body.weight * props.body.weightUnit) * 10) + (heightBuffer * 6.25) - (props.body.age * 5);
                (props.body.gender == 'Male') ? recBuffer += 5 : recBuffer -= 161;
                break;
            case 'Carbohydrates':
                break;
            case 'Fats':
                break;
        };

        setRec((recBuffer) ? recBuffer : 0); // if !recBuffer then return 0 so that it can never return NaN
    });

    return (
        <div class={styles.infoCard}>
            <h2>{props.title}</h2>

            <div class={styles.subSection}>
                <div>
                    <h3>Total</h3>
                    <p>{Math.round(total() * 10) / 10}</p>
                </div>
                <div>
                    <h3>Recommended</h3>
                    <p>{Math.round(rec() * 10) / 10}</p>
                </div>    
            </div>
        </div>
    )
}