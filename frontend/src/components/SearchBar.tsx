import { createEffect, createResource, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import { createStore } from "solid-js/store";
import { apiCall } from '../api';
import { ChevronLeftIcon, SearchIcon } from '../icons';
import { FoodGeneralInfo, FoodNutritionFacts } from '../schemas';
import GroupChip from './GroupChip';
import styles from './Search.module.css';
import SearchResult from './SearchResult';

interface SearchBarProps {
    callback: (info: FoodNutritionFacts | undefined) => void;
}

interface SearchOptions {
    query: string;
    groups: string[];
}

const fetchSearchResults = async (query: SearchOptions) => apiCall(`/search?query=${query.query}&groups=${query.groups.join(',')}&limit=25`);
const fetchFullData = async (query: string) => apiCall(`/?food=${query}`);

export default function SearchBar(props: SearchBarProps) {
    const [ options, setOptions ] = createStore<SearchOptions>({
        query: '',
        groups: []
    });
    const [ results, { refetch, mutate } ] = createResource(options, fetchSearchResults);
    const [ fullData, setFullData ] = createStore(undefined);
    const [ groups ] = createResource(async () => apiCall('/groups'));
    const [ toggledGroups, setToggledGroups ] = createStore<string[]>([]);
    const [ loading, setLoading ] = createSignal(false);
    let searchBox;

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

    const escapeKeyHandler = e => {
        if (e.key == 'Escape') {
            props.callback(undefined);
        }
    };

    const callbackWithDataHandler = async (food: FoodGeneralInfo) => {
        setLoading(true);

        let data = await fetchFullData(food.name);

        setFullData(data);

        if (!data['detail']) {
            props.callback(data);
        }

        setLoading(false);
    }

    document.addEventListener('keydown', escapeKeyHandler);

    onMount(() => {
        searchBox.focus();
    });

    onCleanup(() => {
        document.removeEventListener('keydown', escapeKeyHandler);
    });

    return (
        <>
            <div class={styles.shadow} onClick={ e => props.callback(undefined) }></div>

            <div class={styles.content}>

                <div class={styles.fullSearchBar}>
                    <div onClick={ e => props.callback(undefined) } class={styles.backButton}>
                        <ChevronLeftIcon />
                    </div>

                    <div class={styles.connectedSearchBar}>
                        <SearchIcon />

                        <input type="search" class={styles.searchEntry + " " + styles.searchBox} placeholder="Search foods..." onInput={ e => {
                            setOptions({ ...options, query: e.currentTarget.value });
                            refetch();
                        } } ref={searchBox} />
                    </div>
                </div>

                <Show when={fullData && fullData['detail']}>
                    <p class={`${styles.error} ${styles.messageBox}`}>Error: {fullData['detail']['message']}</p>
                </Show>

                <Show when={loading()}>
                    <p class={`${styles.messageBox}`}>Loading...</p>
                </Show>
                
                <div class={styles.groups}>
                    <For each={ groups() }>
                        { (result: string, i) => (
                            <GroupChip group={result} setGroups={setToggledGroups} getGroups={toggledGroups} />
                        ) }
                    </For>
                </div>

                <div class={styles.autocompleteResults}>
                    <For each={ results() }>
                        { (result: FoodGeneralInfo, i) => <SearchResult info={result} onClick={ () => callbackWithDataHandler(result) } /> }
                    </For>
                </div>
            </div>
        </>
    )
}