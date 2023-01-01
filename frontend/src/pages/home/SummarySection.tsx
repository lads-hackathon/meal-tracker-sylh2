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
                        console.log(element.nutrition.serving_size_grams);
                        totalBuffer += (element.nutrition.calories * (element.nutrition.serving_size_grams / 100));
                        break;

                    case 'Carbohydrates':
                        totalBuffer += (element.nutrition.total_carb_grams * (element.nutrition.serving_size_grams / 100));
                        break;

                    case 'Fats':
                        totalBuffer += (element.nutrition.total_fat_grams * (element.nutrition.serving_size_grams / 100));
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
                recBuffer = 250;
                break;
            case 'Fats':
                recBuffer = 60;
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
                    <p>{ (Math.round(total() * 10) / 10) + ((props.title == 'Calories') ? '' : ' g')}</p>
                </div>
                <div>
                    <h3>Recommended</h3>
                    <p>{Math.round(rec() * 10) / 10 + ((props.title == 'Calories') ? '' : ' g')}</p>
                </div>    
            </div>
        </div>
    )
}