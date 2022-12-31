import { Accessor, createResource, createSignal, For } from 'solid-js';
import { searchForWorkspaceRoot } from 'vite';
import { apiCall } from '../api';
import { FoodNutritionFacts } from '../schemas';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    
}

const fetchSearchResults = async (query) => apiCall(`/search?q=${query}`);

export default function SearchBar(props: SearchBarProps) {
    const [ query, setQuery ] = createSignal<string>();
    const [ results ] = createResource(query, fetchSearchResults);

    return (
        <div class={styles.shadow}>
            <input type="search" class={styles.search} placeholder="Search foods..." onInput={ e => setQuery(e.currentTarget.value) } />

            <div>
                <For each={ results() }>
                    { (result: FoodNutritionFacts, i) => (
                        <h1 class={styles.autocompleteEntry}>{result.name}</h1>
                    ) }
                </For>
            </div>
        </div>
    )
}