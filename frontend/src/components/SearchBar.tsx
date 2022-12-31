import { createEffect, createResource, createSignal, For, Show } from 'solid-js';
import { createStore } from "solid-js/store";
import { apiCall } from '../api';
import { FoodGeneralInfo } from '../schemas';
import GroupChip from './GroupChip';
import styles from './Search.module.css';
import SearchResult from './SearchResult';

interface SearchBarProps {
    callback: (info: FoodGeneralInfo) => void;
}

interface SearchOptions {
    query: string;
    groups: string[];
}

const fetchSearchResults = async (query: SearchOptions) => apiCall(`/search?query=${query.query}&groups=${query.groups.join(',')}&limit=150`);

export default function SearchBar(props: SearchBarProps) {
    const [ options, setOptions ] = createStore<SearchBarProps>({
        query: '',
        groups: []
    });
    const [ results, { refetch, mutate } ] = createResource(options, fetchSearchResults);
    const [ groups ] = createResource(async () => apiCall('/groups'));
    const [ toggledGroups, setToggledGroups ] = createStore<string[]>([]);

    createEffect(() => {
        if (toggledGroups.length == 0) {
            setOptions({
                ...options,
                groups: groups()
            });
        } else {
            setOptions({
                ...options,
                groups: toggledGroups
            });
        }

        refetch();
    });

    return (
        <div class={styles.shadow}>
            <div class={styles.content}>
                <input type="search" class={styles.searchEntry + " " + styles.searchBox} placeholder="Search foods..." onInput={ e => {
                    setOptions({ ...options, query: e.currentTarget.value });
                    refetch();
                } } />
                
                <div class={styles.groups}>
                    <For each={ groups() }>
                        { (result: string, i) => (
                            <GroupChip group={result} setGroups={setToggledGroups} getGroups={toggledGroups} />
                        ) }
                    </For>
                </div>

                <div class={styles.autocompleteResults}>
                    <For each={ results() }>
                        { (result: FoodGeneralInfo, i) => <SearchResult info={result} onClick={ e => props.callback(result) } /> }
                    </For>
                </div>
            </div>
        </div>
    )
}