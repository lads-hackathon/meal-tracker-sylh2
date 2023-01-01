import { Accessor, createEffect, createSignal, For, Show } from 'solid-js';
import SearchBar from '../../components/SearchBar';
import MealSection from './MealSection';

import { createStore } from 'solid-js/store';
import { BodyInfo, FoodNutritionFacts, Meal } from '../../schemas';
import styles from './Home.module.css';
import InfoBox from './InfoBox';
import InputSection from './InputSection';
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
			foods: [
				// {"name":"kiwi","info":{"name":"Kiwi","group":"Fruits","subgroup":"Tropical fruits","description":"The kiwifruit, often shortened to kiwi in many parts of the world, is the edible berry of a woody vine in the genus Actinidia. The most common cultivar group of kiwifruit ('Hayward') is oval, about the size of a large hen's egg (5?8 centimetres in length and 4.5?5.5 centimetres in diameter). It has a fibrous, dull greenish-brown skin and bright green or golden flesh with rows of tiny, black, edible seeds. The fruit has a soft texture and a sweet but unique flavor, and today is a commercial crop in several countries, such as Italy, New Zealand, Chile, Greece and France.","image":"https://foodb.ca/system/foods/pictures/4/full/4.png"},"nutrition":{"calories":59.5,"total_fat_grams":0.5,"saturated_fat_grams":0.0,"cholesterol_milligrams":0,"sodium_milligrams":3,"total_carb_grams":14.9,"dietary_fiber_grams":3.0,"sugars_grams":9.1,"proteins_grams":1.1,"potassium_milligrams":33,"serving_size_grams":100.0},"recipes":[{"recipe_name":"Frozen Grapes and Kiwi","image_link":"https://edamam-product-images.s3.amazonaws.com/web-img/eed/eed6cb4bd6313cacc691862d0e014892.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMSJGMEQCIHzEYkP57FFE4aPWR225urDVhZk0guAr%2FmZVTIZqshTrAiBJzL47dFGabg%2F2vVixBwJgrfc%2Byeonr1kBfVJpJZ8IqSrVBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMCU9mHTXe5agCUy%2ByKqkEYMvH8i102poXPRXpVaoUvqDARu%2BgP1latxEsjjVFHyYM7QdvAzjuUx0H1S2PwxgMj5CKiDu3KjB%2Bv2DHa7UUh6JhAg59PbxkX4Hy0IwMxpUYBIP1qAvRXZbL6FvVWfr%2FhBLWLZF0jbHXCstM99vqSLG2CRjPjdWiXT3ZgFVSgOorIYOJzKaK1EuPlAdTIrehm3hwytWOTZm6GIYFhmjF0Sn1Lk3CkH0na%2B6YNhJJFvFufBIgfWQqsjSol%2FlqBkBUM3dIRxsPDECQp6IwUkC5zUkP5170I0SWs7XKCxCk%2BQteKZ7mKcChhXR1%2FqqsJoJbsOfS6MuTK3jgItk8sIrR7fpI7mlAX5fBe20fRauz4oKuR7TEhugscbiJxVLdglMFe0PW95%2FP%2FYNm8jRzeaH3aNWTaNEyQNUmax4utylxmJd2MHAxydzp9gAWaGJhCK%2F9uBkuGAC9%2BxUhr0RvzRt%2BYirVF8g5PZhnmhsFsyL213kjakJ0LXw%2BE9Y4ZpHliE7GTzdCfAlt2KXy1bY91cYBa%2BPAzPgKiNGp1T0D10gq%2F8MLw6B1W6GXwDQqeEYy59e8m8X2hfXK6%2BQSfm%2BseRGlzKv6Q5RTr7yAFLYSnPcE9W7qLuLtO4bQ3qczH4iJnBiABj66vTWHqxNzfRbTtjau0AmlK4guD7J3O54hlfNRmBh3PzZIO7V97zjrL4oePZotyYvQUIv%2F15cuUKB7nyxF0ilZU5Dfqh3TFjCpsMOdBjqqAZTX6ZdDo9UDNkQruuQucMhI%2FWlOB9wJs%2B2a%2BvGUOSm85ukkGqyVw9%2FKm29qNsVf7oowcwNaC%2ByB3iyjfftCgK4LccIZ2Yd9jYO6m0D0FJYPFEW7u5Mib9581ykWIjoaIgJrisb4OzreEAndtFrTkt%2FowvPIcT5UcshvR8308166ZW9HC7gV1ZU0JjbFpQoctzk1ZgysRMKI3Th%2F0FKCmSRJky8aDi3pfGXr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230101T010807Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLYVFUTOM%2F20230101%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b9f83b4efc2d860a1dd179c68ec22b73ef2271359262c8f69c054bc40d40c380","ingredients":["1 cup grapes","1 kiwi, peeled and cut into 1-inch pieces"]},{"recipe_name":"Kiwi Strawberry Sorbet","image_link":"https://edamam-product-images.s3.amazonaws.com/web-img/1db/1db23eb23a5e319e5d033d88af3a1833.JPG?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMSJGMEQCIHzEYkP57FFE4aPWR225urDVhZk0guAr%2FmZVTIZqshTrAiBJzL47dFGabg%2F2vVixBwJgrfc%2Byeonr1kBfVJpJZ8IqSrVBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMCU9mHTXe5agCUy%2ByKqkEYMvH8i102poXPRXpVaoUvqDARu%2BgP1latxEsjjVFHyYM7QdvAzjuUx0H1S2PwxgMj5CKiDu3KjB%2Bv2DHa7UUh6JhAg59PbxkX4Hy0IwMxpUYBIP1qAvRXZbL6FvVWfr%2FhBLWLZF0jbHXCstM99vqSLG2CRjPjdWiXT3ZgFVSgOorIYOJzKaK1EuPlAdTIrehm3hwytWOTZm6GIYFhmjF0Sn1Lk3CkH0na%2B6YNhJJFvFufBIgfWQqsjSol%2FlqBkBUM3dIRxsPDECQp6IwUkC5zUkP5170I0SWs7XKCxCk%2BQteKZ7mKcChhXR1%2FqqsJoJbsOfS6MuTK3jgItk8sIrR7fpI7mlAX5fBe20fRauz4oKuR7TEhugscbiJxVLdglMFe0PW95%2FP%2FYNm8jRzeaH3aNWTaNEyQNUmax4utylxmJd2MHAxydzp9gAWaGJhCK%2F9uBkuGAC9%2BxUhr0RvzRt%2BYirVF8g5PZhnmhsFsyL213kjakJ0LXw%2BE9Y4ZpHliE7GTzdCfAlt2KXy1bY91cYBa%2BPAzPgKiNGp1T0D10gq%2F8MLw6B1W6GXwDQqeEYy59e8m8X2hfXK6%2BQSfm%2BseRGlzKv6Q5RTr7yAFLYSnPcE9W7qLuLtO4bQ3qczH4iJnBiABj66vTWHqxNzfRbTtjau0AmlK4guD7J3O54hlfNRmBh3PzZIO7V97zjrL4oePZotyYvQUIv%2F15cuUKB7nyxF0ilZU5Dfqh3TFjCpsMOdBjqqAZTX6ZdDo9UDNkQruuQucMhI%2FWlOB9wJs%2B2a%2BvGUOSm85ukkGqyVw9%2FKm29qNsVf7oowcwNaC%2ByB3iyjfftCgK4LccIZ2Yd9jYO6m0D0FJYPFEW7u5Mib9581ykWIjoaIgJrisb4OzreEAndtFrTkt%2FowvPIcT5UcshvR8308166ZW9HC7gV1ZU0JjbFpQoctzk1ZgysRMKI3Th%2F0FKCmSRJky8aDi3pfGXr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230101T010807Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLYVFUTOM%2F20230101%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f7b654a0098b55476a88550bdddcc159adfdae2250a5f279c0638549f7c8ce2a","ingredients":["1 kiwi","2-3 strawberries","1 tablespoon aged balsamic vinegar","Freshly ground black pepper"]},{"recipe_name":"Kiwi Popsicle","image_link":"https://edamam-product-images.s3.amazonaws.com/web-img/62e/62e32b16cc7179bea4b8511fbdf01ab4.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMSJGMEQCIHzEYkP57FFE4aPWR225urDVhZk0guAr%2FmZVTIZqshTrAiBJzL47dFGabg%2F2vVixBwJgrfc%2Byeonr1kBfVJpJZ8IqSrVBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMCU9mHTXe5agCUy%2ByKqkEYMvH8i102poXPRXpVaoUvqDARu%2BgP1latxEsjjVFHyYM7QdvAzjuUx0H1S2PwxgMj5CKiDu3KjB%2Bv2DHa7UUh6JhAg59PbxkX4Hy0IwMxpUYBIP1qAvRXZbL6FvVWfr%2FhBLWLZF0jbHXCstM99vqSLG2CRjPjdWiXT3ZgFVSgOorIYOJzKaK1EuPlAdTIrehm3hwytWOTZm6GIYFhmjF0Sn1Lk3CkH0na%2B6YNhJJFvFufBIgfWQqsjSol%2FlqBkBUM3dIRxsPDECQp6IwUkC5zUkP5170I0SWs7XKCxCk%2BQteKZ7mKcChhXR1%2FqqsJoJbsOfS6MuTK3jgItk8sIrR7fpI7mlAX5fBe20fRauz4oKuR7TEhugscbiJxVLdglMFe0PW95%2FP%2FYNm8jRzeaH3aNWTaNEyQNUmax4utylxmJd2MHAxydzp9gAWaGJhCK%2F9uBkuGAC9%2BxUhr0RvzRt%2BYirVF8g5PZhnmhsFsyL213kjakJ0LXw%2BE9Y4ZpHliE7GTzdCfAlt2KXy1bY91cYBa%2BPAzPgKiNGp1T0D10gq%2F8MLw6B1W6GXwDQqeEYy59e8m8X2hfXK6%2BQSfm%2BseRGlzKv6Q5RTr7yAFLYSnPcE9W7qLuLtO4bQ3qczH4iJnBiABj66vTWHqxNzfRbTtjau0AmlK4guD7J3O54hlfNRmBh3PzZIO7V97zjrL4oePZotyYvQUIv%2F15cuUKB7nyxF0ilZU5Dfqh3TFjCpsMOdBjqqAZTX6ZdDo9UDNkQruuQucMhI%2FWlOB9wJs%2B2a%2BvGUOSm85ukkGqyVw9%2FKm29qNsVf7oowcwNaC%2ByB3iyjfftCgK4LccIZ2Yd9jYO6m0D0FJYPFEW7u5Mib9581ykWIjoaIgJrisb4OzreEAndtFrTkt%2FowvPIcT5UcshvR8308166ZW9HC7gV1ZU0JjbFpQoctzk1ZgysRMKI3Th%2F0FKCmSRJky8aDi3pfGXr&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230101T010807Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLYVFUTOM%2F20230101%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0e252da78e8e2387ad3a743d153da574ba0bca04055012ac3785431a90f2c778","ingredients":["2 cups of fresh yogurt","4 ripe kiwi fruits","½ cup granulated sugar","1 tsp. lemon juice","½ tsp. lemon zest"]}]}
			]
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
	const [ infoBoxFood, setInfoBoxFood ] = createSignal<FoodNutritionFacts | undefined>(undefined);
	const [ info ] = createStore(['Calories', 'Carbohydrates', 'Fats']);
	
	let [ mealCount, setMealCount ] = createSignal<number>(meals.length + 1);

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

	const deleteFoodFromMeal = (index: Accessor<number>, mealName: string) => {
		setMeals(
			(meal: Meal) => meal.name == mealName,
			"foods",
			(foods: FoodNutritionFacts[]) => {
				let newFoodList = [];

				for (let i = 0; foods.length > i; i++) {
					if (i == index()) continue;
					newFoodList.push(foods[i]);
				}

				return newFoodList;
			}
		);
	}

	const [ mealName, setMealName ] = createSignal<string>();

	const addMealCallback = () => {
		if (!mealName()) {
			setMealName('New meal');
		}
		
		setMeals([...meals, {name: mealName(), foods: []}]);
	}

	return (
		<>
			<div style="font-size: 1.5em;">
				<h1>Happy Meal Year</h1>
				<p style="text-align: center;">Create your diet for the new year!</p>
			</div>

			<Show when={ searching() }>
				<SearchBar callback={ searchCallback } />
			</Show>

			<Show when={ infoBoxFood() }>
				<InfoBox food={infoBoxFood()} close={ () => setInfoBoxFood(undefined) } />
			</Show>

			<section class={styles.mealGrid}>
				<For each={ meals }>
					{ ( meal: Meal, i ) => (
						<MealSection meal={meal} onClick={ e => setSearching(meal) } deleteItem={deleteFoodFromMeal} showInfoBox={ food => setInfoBoxFood(food) } />
					) }
				</For>

				<div class={styles.addSection}>
					<input class={styles.inputField} type="text" onInput={ e => setMealName(e.currentTarget.value)}/>
					<button class={styles.inputField} onClick={ () => addMealCallback() }>Add meal</button>
				</div>
			</section>

			<section class={styles.bottomSection}>
				<div>
					<h1 class={styles.subtitle}> Body Information </h1>
					<InputSection body={bodyInfo} setBodyInfo={setBodyInfo} />
				</div>

				<div>
					<h1 class={styles.subtitle}> Summary </h1>
					
					<div class={styles.infoGrid}>
						<For each={ info }>
							{ ( infoTitle: string, i ) => (
								<SummarySection title={infoTitle} mealArray={meals} body={bodyInfo}/>
							) }
						</For>
					</div>
				</div>
			</section>
			
		</>
	);
}
