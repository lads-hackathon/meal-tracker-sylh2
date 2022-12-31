import { createSignal, For, Show } from 'solid-js';
import SearchBar from '../../components/SearchBar';
import MealSection from './MealSection';

import styles from './Home.module.css';
import { createStore } from 'solid-js/store';

export default function Home() {
	const [ meals, setMeals ] = createStore(['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Desert']);
	const [ searching, setSearching ] = createSignal(false);

	return (
		<>
			<h1>Meal App</h1>

			<Show when={ searching() }>
				<SearchBar callback={ e => setSearching(false) } />
			</Show>

			<section class={styles.mealGrid}>
				<For each={ meals }>
					{ ( meal: string, i ) => (
						<MealSection mealName={meal} onClick={ e => setSearching(true)} />
					) }
				</For>
			</section>
		</>
	);
}
