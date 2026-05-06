const CATEGORY_DEFINITIONS = [
    {
        slug: 'pasta',
        name: 'Pasta',
        pageTitle: 'Pasta för långa kvällar och mjuka smaker',
        pageIntro:
            'Här samlar vi pastarätter som känns generösa, varma och tydligt italienska, från snabba vardagsfavoriter till långsammare helgmiddagar.',
        description:
            'Krämiga, tomatiga och smörblanka pastarätter med fokus på tydlig råvarukänsla och mjuk komfort.',
        accent: 'Från silkig carbonara till långkokt ragù och fyllda favoriter.',
        searchPlaceholders: {
            recipes: 'Sök efter carbonara, ravioli eller gnocchi',
            ingredients: 'Sök efter parmesan, basilika, citron eller pancetta',
        },
        matches: ['pasta', 'pastaratt', 'pastaratter', 'pasta-dishes'],
    },
    {
        slug: 'pizza',
        name: 'Pizza',
        pageTitle: 'Pizza med krisp, värme och kvällskänsla',
        pageIntro:
            'En samling för pizzor och närliggande favoriter där deg, ost och topping får vara i centrum med en mer redaktionell känsla.',
        description:
            'Bakade favoriter där textur, ost och tomat möts i recept som känns både sociala och självsäkra.',
        accent: 'Tunna bottnar, mjuka kanter och tydliga italienska smaker.',
        searchPlaceholders: {
            recipes: 'Sök efter margherita, pinsa eller bianca',
            ingredients: 'Sök efter mozzarella, tomat, salami eller ruccola',
        },
        matches: ['pizza', 'pinsa', 'flatbread'],
    },
    {
        slug: 'antipasti',
        name: 'Antipasti',
        pageTitle: 'Antipasti som sätter tonen för hela måltiden',
        pageIntro:
            'Små rätter, tilltugg och inledningar som ger kategorin en tydlig egen identitet direkt under navigeringen.',
        description:
            'Lätta serveringar och delbara rätter som öppnar middagen med sälta, syra och färska råvaror.',
        accent: 'Perfekt för buffé, aperitivo och första intrycket på bordet.',
        searchPlaceholders: {
            recipes: 'Sök efter bruschetta, crostini eller burrata',
            ingredients: 'Sök efter oliver, burrata, tomat eller prosciutto',
        },
        matches: ['antipasti', 'forratt', 'forratter', 'starter', 'starters', 'appetizer', 'appetizers'],
    },
    {
        slug: 'huvudratter',
        name: 'Huvudrätter',
        pageTitle: 'Huvudrätter med mer tyngd och middagskänsla',
        pageIntro:
            'Här hittar du större serveringar där proteiner, såser och tillbehör får ta mer plats utan att sidan tappar sin luftiga rytm.',
        description:
            'Mättande recept för kvällens huvudnummer med tydlig struktur, djupare smaker och lugn presentation.',
        accent: 'När du vill laga något som känns mer komplett och middagsklart.',
        searchPlaceholders: {
            recipes: 'Sök efter kalv, kyckling eller långbakade rätter',
            ingredients: 'Sök efter citron, vitlök, salvia eller parmesan',
        },
        matches: ['huvudratt', 'huvudratter', 'main', 'main-course', 'main-courses', 'dinner'],
    },
    {
        slug: 'fisk-och-skaldjur',
        name: 'Fisk och skaldjur',
        pageTitle: 'Fisk och skaldjur med lättare italiensk elegans',
        pageIntro:
            'En kategori för havsnära rätter där citrus, olivolja och örter får göra jobbet med mindre tyngd och mer precision.',
        description:
            'Friskare recept med havston, smör, örter och tydlig råvarukänsla i en renare palett.',
        accent: 'Passar när du vill ha något lättare men fortfarande generöst.',
        searchPlaceholders: {
            recipes: 'Sök efter scampi, musslor eller citronbakad fisk',
            ingredients: 'Sök efter räkor, citron, persilja eller chili',
        },
        matches: ['fisk', 'skaldjur', 'seafood', 'fish', 'shellfish'],
    },
    {
        slug: 'vegetariskt',
        name: 'Vegetariskt',
        pageTitle: 'Vegetariska rätter med mycket färg och råvarukärlek',
        pageIntro:
            'Grönare italienska favoriter där grönsaker, ost, örter och baljväxter får en tydligare scen än på startsidan.',
        description:
            'Varmt, grönt och generöst med fokus på säsong, struktur och enkla italienska smaker.',
        accent: 'Perfekt för lättare middagar och grönare tolkningar av klassiker.',
        searchPlaceholders: {
            recipes: 'Sök efter aubergine, risotto eller vegetariska favoriter',
            ingredients: 'Sök efter zucchini, ricotta, basilika eller svamp',
        },
        matches: ['vegetarisk', 'vegetariskt', 'vegetarian', 'veg'],
    },
    {
        slug: 'sallader',
        name: 'Sallader',
        pageTitle: 'Sallader som känns fräscha men fortfarande generösa',
        pageIntro:
            'Lättare recept med mer luft, syra och färska komponenter, utan att känslan blir tunn eller ofärdig.',
        description:
            'Ljusa rätter med krisp, örter och rena smaker för luncher och lättare middagar.',
        accent: 'En kategori för fräschör, kontrast och enklare serveringar.',
        searchPlaceholders: {
            recipes: 'Sök efter caprese, sallad med burrata eller örtsåser',
            ingredients: 'Sök efter tomat, ruccola, citron eller mozzarella',
        },
        matches: ['sallad', 'sallader', 'salad', 'salads'],
    },
    {
        slug: 'desserter',
        name: 'Desserter',
        pageTitle: 'Desserter som avslutar måltiden med mjuk dramatik',
        pageIntro:
            'Här får söta italienska avslut ett eget rum med lite mer elegans, mer luft och tydligare fokus på känsla.',
        description:
            'Krämiga, luftiga och sirligt serverade recept för den sista delen av menyn.',
        accent: 'För tiramisu, citronkräm och andra avslut med lite mer wow.',
        searchPlaceholders: {
            recipes: 'Sök efter tiramisu, panna cotta eller cannoli',
            ingredients: 'Sök efter mascarpone, citron, kaffe eller vanilj',
        },
        matches: ['dessert', 'desserter', 'dolci', 'sweet', 'sweets'],
    },
]

function normalizeCategoryValue(value) {
    return String(value ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/&/g, ' och ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function normalizeSearchText(value) {
    return String(value ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function prettifySlug(slug) {
    return String(slug ?? '')
        .split('-')
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ')
}

const CATEGORY_LOOKUP = new Map(
    CATEGORY_DEFINITIONS.map((definition, index) => [
        definition.slug,
        {
            ...definition,
            order: index,
            matchSet: new Set(
                [definition.slug, definition.name, ...(definition.matches || [])].map(normalizeCategoryValue)
            ),
        },
    ])
)

const CATEGORY_LIST = Array.from(CATEGORY_LOOKUP.values())
const PRIMARY_NAVIGATION_SLUGS = ['pasta', 'pizza', 'antipasti', 'fisk-och-skaldjur']

function createFallbackCategory(value) {
    const slug = normalizeCategoryValue(value)
    const name = prettifySlug(slug)

    return {
        slug,
        name,
        pageTitle: `Utforska ${name.toLowerCase()} med Ricetta`,
        pageIntro: `Här samlar vi recept med fokus på ${name.toLowerCase()} i en mer redaktionell kategorivy.`,
        description: `En samling recept där ${name.toLowerCase()} får ta plats med tydligare struktur och lugnare filtrering.`,
        accent: 'Kategoriupplevelsen är förberedd för att kunna växa vidare när mer data kopplas in.',
        searchPlaceholders: {
            recipes: `Sök recept inom ${name.toLowerCase()}`,
            ingredients: `Sök ingredienser inom ${name.toLowerCase()}`,
        },
        matches: [slug],
        order: Number.MAX_SAFE_INTEGER,
        isFallback: true,
    }
}

function resolveCategoryDefinition(value) {
    const normalized = normalizeCategoryValue(value)

    if (!normalized) {
        return null
    }

    return CATEGORY_LIST.find((definition) => definition.matchSet.has(normalized)) || null
}

function createCategoryAliasSet(category) {
    return new Set(
        [category.slug, category.name, ...(category.matches || []), ...(category.backendCategories || [])]
            .map(normalizeCategoryValue)
            .filter(Boolean)
    )
}

function getRecipeSearchTerms(recipe) {
    return [
        recipe.title,
        recipe.description,
        ...(recipe.instructions || []),
    ]
}

function getIngredientSearchTerms(recipe) {
    return (recipe.ingredients || []).flatMap((ingredient) => [
        ingredient.name,
        `${ingredient.name} ${ingredient.amount} ${ingredient.unit}`,
    ])
}

function getCategorySearchTerms(recipe) {
    return Array.from(
        new Set(
            (recipe.categories || []).flatMap((rawCategory) => {
                const definition = resolveCategoryDefinition(rawCategory) || createFallbackCategory(rawCategory)

                return [
                    rawCategory,
                    definition.name,
                    definition.slug,
                    definition.slug.replace(/-/g, ' '),
                    ...(definition.matches || []),
                ]
            })
        )
    )
}

function createSearchDocument(recipe) {
    const recipeText = normalizeSearchText(getRecipeSearchTerms(recipe).join(' '))
    const ingredientText = normalizeSearchText(getIngredientSearchTerms(recipe).join(' '))
    const categoryText = normalizeSearchText(getCategorySearchTerms(recipe).join(' '))

    return {
        recipeText,
        ingredientText,
        categoryText,
        combinedText: [recipeText, ingredientText, categoryText].filter(Boolean).join(' '),
    }
}

function getSearchableTextByScope(searchDocument, searchScope) {
    if (searchScope === 'ingredients') {
        return [searchDocument.ingredientText, searchDocument.categoryText].filter(Boolean).join(' ')
    }

    if (searchScope === 'all') {
        return searchDocument.combinedText
    }

    return [searchDocument.recipeText, searchDocument.ingredientText, searchDocument.categoryText]
        .filter(Boolean)
        .join(' ')
}

export function getCategoryConfigBySlug(slug) {
    return CATEGORY_LOOKUP.get(normalizeCategoryValue(slug)) || null
}

export function buildEditorialCategories(recipes = []) {
    const categoryMap = new Map()

    recipes.forEach((recipe) => {
        const matchedSlugs = new Set()

        ;(recipe.categories || []).forEach((rawCategory) => {
            const definition = resolveCategoryDefinition(rawCategory) || createFallbackCategory(rawCategory)

            if (matchedSlugs.has(definition.slug)) {
                return
            }

            matchedSlugs.add(definition.slug)

            if (!categoryMap.has(definition.slug)) {
                categoryMap.set(definition.slug, {
                    ...definition,
                    recipeCount: 0,
                    image: '',
                    backendCategories: new Set(),
                })
            }

            const entry = categoryMap.get(definition.slug)
            entry.recipeCount += 1
            entry.image ||= recipe.imageUrl || recipe.image || ''
            entry.backendCategories.add(rawCategory)
        })
    })

    return Array.from(categoryMap.values())
        .sort((left, right) => {
            if (left.order !== right.order) {
                return left.order - right.order
            }

            return left.name.localeCompare(right.name, 'sv')
        })
        .map((category) => ({
            ...category,
            backendCategories: Array.from(category.backendCategories),
        }))
}

export function getCategoryBySlug(slug, recipes = []) {
    const normalizedSlug = normalizeCategoryValue(slug)
    const editorialCategories = buildEditorialCategories(recipes)
    const liveCategory = editorialCategories.find((category) => category.slug === normalizedSlug)

    if (liveCategory) {
        return liveCategory
    }

    const configuredCategory = getCategoryConfigBySlug(normalizedSlug)

    if (configuredCategory) {
        return {
            ...configuredCategory,
            recipeCount: 0,
            image: '',
            backendCategories: [],
        }
    }

    return null
}

export function recipeMatchesCategory(recipe, categoryOrSlug) {
    const category =
        typeof categoryOrSlug === 'string'
            ? getCategoryConfigBySlug(categoryOrSlug) || createFallbackCategory(categoryOrSlug)
            : categoryOrSlug

    if (!category) {
        return false
    }

    const aliases = createCategoryAliasSet(category)

    return (recipe.categories || []).some((rawCategory) => aliases.has(normalizeCategoryValue(rawCategory)))
}

export function getRecipesForCategory(recipes = [], categoryOrSlug) {
    return recipes.filter((recipe) => recipeMatchesCategory(recipe, categoryOrSlug))
}

export function filterRecipesBySearch(recipes = [], query = '', searchScope = 'recipes') {
    const normalizedQuery = normalizeSearchText(query)

    if (!normalizedQuery) {
        return recipes
    }

    return recipes.filter((recipe) => {
        const searchableText = getSearchableTextByScope(createSearchDocument(recipe), searchScope)

        return searchableText.includes(normalizedQuery)
    })
}

export function getPrimaryNavigationCategories(categories = [], limit = PRIMARY_NAVIGATION_SLUGS.length) {
    const categoryMap = new Map(categories.map((category) => [category.slug, category]))
    const prioritizedCategories = PRIMARY_NAVIGATION_SLUGS.map((slug) => categoryMap.get(slug)).filter(Boolean)
    const fallbackCategories = categories.filter((category) => !PRIMARY_NAVIGATION_SLUGS.includes(category.slug))

    return [...prioritizedCategories, ...fallbackCategories].slice(0, limit)
}

export function getPrimaryCategoryForRecipe(recipe) {
    const firstCategory = recipe?.categories?.[0]

    if (!firstCategory) {
        return null
    }

    const definition = resolveCategoryDefinition(firstCategory) || createFallbackCategory(firstCategory)

    return {
        ...definition,
        backendCategories: [firstCategory],
    }
}

export function getUiCategoryLabels(recipe) {
    return Array.from(
        new Set(
            (recipe?.categories || []).map((category) => {
                const definition = resolveCategoryDefinition(category) || createFallbackCategory(category)
                return definition.name
            })
        )
    )
}
