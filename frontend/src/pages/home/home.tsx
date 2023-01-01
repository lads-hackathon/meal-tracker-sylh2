import { createSignal, For, Show } from 'solid-js';
import SearchBar from '../../components/SearchBar';
import MealSection from './MealSection';

import { createStore } from 'solid-js/store';
import { BodyInfo, FoodNutritionFacts, Meal } from '../../schemas';
import styles from './Home.module.css';
import SummarySection from './SummarySection';

export default function Home() {
	const [ meals, setMeals ] = createStore<Meal[]>([
		{
			name: "Breakfast",
			foods: []
		},
		{
			name: "Morning Snack",
			foods: []
		},
		{
			name: "Lunch",
			foods: []
		},
		{
			name: "Afternoon Snack",
			foods: []
		},
		{
			name: "Dinner",
			foods: []
		},
		{
			name: "Desert",
			foods: []
		}
	]);
	const [ searching, setSearching ] = createSignal<Meal>();
	const [ info ] = createStore(['Calories', 'Carbohydrates', 'Fats']);

	let [ bodyInfo, setBodyInfo ] = createStore<BodyInfo>({
		weight: 0,
		weightUnit: 1,
		feet: 0,
		inches: 0,
		centimeters: 0,
		age: 0,
		gender: "Male"
	});

	const searchCallback = (food: FoodNutritionFacts | undefined) => {
		if (food != undefined) {
			setMeals(
				(meal: Meal) => meal.name == searching().name,
				"foods",
				(foods: FoodNutritionFacts[]) => [...foods, food]
			);
		}

		setSearching(undefined);
	};

	const [ mealName, setMealName ] = createSignal<string>("placeholder");

	const addMealCallback = () => {
		setMeals([...meals, {name: mealName(), foods: []}]);
	}

	return (
		<>
			<h1>Meal App</h1>

			<Show when={ searching() }>
				<SearchBar callback={ searchCallback } />
			</Show>

			<section class={styles.mealGrid}>
				<For each={ meals }>
					{ ( meal: Meal, i ) => (
						<MealSection meal={meal} onClick={ e => setSearching(meal) } />
					) }
				</For>

				<div>
					<input type="text" onInput={ e => setMealName(e.currentTarget.value)}/>
					<button onClick={ addMealCallback }>Add meal</button>
				</div>
			</section>

			<section>
				<input type="number" placeholder="Weight" onInput={ e => setBodyInfo("weight", parseFloat(e.currentTarget.value)) } />

				<select onInput={ e => setBodyInfo("weightUnit", parseFloat(e.currentTarget.value))}>
					<option value={2.20462}>Pounds (lbs)</option>
					<option value={1}>Kilograms (kg)</option>
				</select>

				<input type="number" placeholder="Feet" onInput={ e => setBodyInfo("feet", parseInt(e.currentTarget.value)) }/>
				<input type="number" placeholder="Inches" onInput={ e => setBodyInfo("inches", parseInt(e.currentTarget.value)) }/>

				<input type="number" placeholder="Centimeters" onInput={ e => setBodyInfo("centimeters", parseFloat(e.currentTarget.value)) }/>

				<input type="number" placeholder="Age" onInput={ e => setBodyInfo("age", parseInt(e.currentTarget.value)) }/>

				<select onInput={ e => setBodyInfo("gender", e.currentTarget.value)}>
					<option>Male</option>
					<option>Female</option>
					<option>Other</option>
				</select>
			</section>

			<section>
				<h1 class={styles.subtitle}> Summary </h1>
				
				<div class={styles.infoGrid}>
					<For each={ info }>
						{ ( infoTitle: string, i ) => (
							<SummarySection title={infoTitle} mealArray={meals} body={bodyInfo}/>
						) }
					</For>
				</div>
			</section>
			
		</>
	);
}
