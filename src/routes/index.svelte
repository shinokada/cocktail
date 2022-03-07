<script context="module" lang="ts">
	import type { DrinkType } from '../types';
	export async function load({ fetch }) {
		const url = 'api/cocktail.json';
		const response = await fetch(url);
		return {
			status: response.status,
			props: {
				drinkProp: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	export let drinkProp: DrinkType;
	let drinkState: DrinkType = drinkProp;

	const handleOnClick = async () => {
		const result = await (await fetch('api/cocktail.json')).json();
		drinkState = result;
	};
</script>

<div class="wrapper py-16">
	<h1>Welcome to Clevenger Cocktail Website</h1>
	<Button name="Get a new drink" on:click={handleOnClick} textSize="text-base" />

	<div class="pt-4">
		<Card header={drinkState.name} img={drinkState.thumbUrl}>
			<p class="text-left">{drinkState.instructions}</p>
			<h2>Ingredients</h2>
			{#each drinkState.ingredients as ingredient}
				<p class="ingredient">{ingredient.amount}{ingredient.name}</p>
			{/each}
		</Card>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
