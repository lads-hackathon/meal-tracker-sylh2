import { Link } from '@solidjs/router';
import styles from './MealSection.module.css';

interface MealSectionProps {
    mealName: string;
    onClick: (element: HTMLDivElement) => void;
}

export default function MealSection(props: MealSectionProps) {
    return (
        <div class={styles.mealBox} onClick={ e => props.onClick(e.currentTarget) }>
            <h1>{props.mealName}</h1>
            <p>+ Add food to meal</p>
        </div>
    )
}