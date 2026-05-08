import { isValidRecipeRating } from "../utils/ratings";

const BASE_URL = "https://lexicon26-1.reky.se";

function slugify(text) {
    return text
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[åä]/g, "a")
        .replace(/ö/g, "o");
}

function normalizeRecipe(recipe) {
    return {
        ...recipe,
        id: recipe._id,
        slug: slugify(recipe.title),
        avgRating: recipe.avgRating ?? null,
    };
}

function parseRatingResponse(data) {
    if (!data || typeof data !== "object") {
        return null;
    }

    if (data._id) {
        return normalizeRecipe(data);
    }

    if (typeof data.avgRating === "number" || data.avgRating === null) {
        return {
            avgRating: data.avgRating,
        };
    }

    return null;
}

export async function getRecipes() {
    const res = await fetch(`${BASE_URL}/recipes`)

    if (!res.ok) {
        throw new Error("Kunde inte hämta recept");
    }

    const data = await res.json()
    return data.map(normalizeRecipe)
}

export async function getRecipeById(recipeId) {
    const res = await fetch(`${BASE_URL}/recipes/${recipeId}`)

    if (!res.ok) {
        throw new Error("Kunde inte hämta receptet");
    }

    const data = await res.json()
    return normalizeRecipe(data)
}

export async function postRecipeRating(recipeId, rating) {
    const numericRating = Number(rating);

    if (!isValidRecipeRating(numericRating)) {
        throw new Error("Betyget måste vara ett heltal mellan 1 och 5");
    }

    const res = await fetch(`${BASE_URL}/recipes/${recipeId}/ratings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: numericRating }),
    });

    if (!res.ok) {
        throw new Error("Kunde inte spara betyget");
    }

    const text = await res.text();

    if (!text) {
        return null;
    }

    try {
        return parseRatingResponse(JSON.parse(text));
    } catch {
        return null;
    }
}

export async function getRecipeBySlug(slug) {
    const recipes = await getRecipes()
    return recipes.find((recipe) => recipe.slug === slug) || null
}

export async function getRecipesByCategory(category) {
    const recipes = await getRecipes()

    return recipes.filter((recipe) =>
        recipe.categories?.some(
            (recipeCategory) => slugify(recipeCategory) === slugify(category)
        )
    )
}

export async function getCategories() {
    const recipes = await getRecipes()
    const categoryMap = new Map()

    recipes.forEach((recipe) => {
        recipe.categories?.forEach((category) => {
            const slug = slugify(category)

            if (!categoryMap.has(slug)) {
                categoryMap.set(slug, {
                    slug,
                    name: category,
                    recipeCount: 0,
                })
            }

            categoryMap.get(slug).recipeCount += 1
        })
    })

    return Array.from(categoryMap.values())
}

export async function getRelatedRecipes(recipeId, category) {
    const recipes = await getRecipes()

    return recipes
        .filter(
            (recipe) =>
                recipe.id !== recipeId &&
                recipe.categories?.some(
                    (recipeCategory) => slugify(recipeCategory) === slugify(category)
                )
        )
        .slice(0, 3)
}

export async function getCommentsByRecipeId(recipeId) {
    const res = await fetch(`${BASE_URL}/recipes/${recipeId}/comments`)

    if (!res.ok) {
        throw new Error('Kunde inte hämta kommentarer')
    }

    return res.json()
}

export async function createComment(recipeId, comment) {
    const res = await fetch(`${BASE_URL}/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    })

    const responseText = await res.text()

    if (!res.ok) {
        console.error('POST comment failed:', {
            status: res.status,
            responseText,
            recipeId,
            comment,
        })

        throw new Error('Kunde inte spara kommentaren')
    }

    return responseText ? JSON.parse(responseText) : comment
}
