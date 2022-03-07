import type { DrinkType, IngredientType } from "src/types";

export async function get(): Promise<{ body: DrinkType }>{
    const result = await (
        await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')).json();
    
    // console.log('result:', result)
    const ingredients: IngredientType[] = [...Array(15)].map((_value, i) => ({
        name: result.drinks[0][`strIngredient${i + 1}`],
        amount:result.drinks[0][`strMeasure${i+1}`]
    })).filter((ingredient) => ingredient.name)

    // console.log('ingredients: ', ingredients)
    const data = {
        name: result.drinks[0].strDrink,
        instructions: result.drinks[0].strInstructions,
        ingredients,
        thumbUrl: result.drinks[0].strDrinkThumb
    }
    // console.log('data: ', data)
    return {
        body: data
    }
}