export async function getRecipes() {
    const res = await fetch("https://lexicon26-1.reky.se/recipes");
    return res.json();
}