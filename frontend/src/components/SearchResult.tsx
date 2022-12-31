import { FoodGeneralInfo } from '../schemas';
import styles from './Search.module.css';

interface SearchResultProps {
    onClick: (element: HTMLDivElement) => void;
    info: FoodGeneralInfo;
}

export default function SearchResult(props: SearchResultProps) {
    return (
        <div class={styles.searchResult + " " + styles.searchEntry} onClick={ e => props.onClick(e.currentTarget) }>
            <img src={props.info.image} alt={`Image of ${props.info.name}`} loading="lazy" />

            <div class={styles.resultText}>
                <h3>{props.info.name} ({props.info.group})</h3>
                <p>{props.info.description}</p>
            </div>
        </div>
    );
}