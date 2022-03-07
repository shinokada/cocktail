<script context="module" lang="ts">
	import type { DrinkType } from '../types';
	export async function load({ fetch }) {
		const url = 'api/cocktail.json';
		const response = await fetch(url);
		// console.log(url);
		// const drink: DrinkType = await (await fetch('index.json')).json();
		// console.log('drink: ', drink);
		// console.log('response:', response.status);
		return {
			status: response.status,
			props: {
				drinkProp: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	export let drinkProp: DrinkType;
	let drinkState: DrinkType = drinkProp;

	const handleOnClick = async () => {
		const result = await (await fetch('api/cocktail.json')).json();
		drinkState = result;
	};
</script>

<div class="wrapper">
	<h1>Welcome to Clevenger Cocktail Website</h1>
	<button on:click={handleOnClick}>Get new drink</button>
	<h2>{drinkState.name}</h2>
	<img src={drinkState.thumbUrl} alt="drink-thumb" class="drink-thumb" />
	<h2>Instruction</h2>
	<p>{drinkState.instructions}</p>
	<h2>Ingredients</h2>
	{#each drinkState.ingredients as ingredient}
		<p class="ingredient">{ingredient.amount}{ingredient.name}</p>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: Arial, Helvetica, sans-serif;
	}

	.drink-thumb {
		width: 300px;
		border-radius: 1rem;
	}

	p {
		max-width: 500px;
		text-align: center;
	}

	.ingredient {
		margin: 2px 0;
	}
</style>
