const categorySeed = [
  {
    slug: 'antipasti',
    name: 'Förrätter',
    description: 'Lätta öppningar med burrata, grillade grönsaker och små rätter för aperitivo.',
    accent: 'Börja måltiden med färg, sälta och krisp.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pasta',
    name: 'Pasta',
    description: 'Silkeslena såser, generösa portioner och moderna pastarätter med restaurangkänsla.',
    accent: 'Mjuka texturer och varm kvällsenergi.',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pizza',
    name: 'Pizza',
    description: 'Krispiga bottnar, bubblande ost och italienska smaker som gärna delas runt bordet.',
    accent: 'Fredagsmys möter elegant pizzeria.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'risotto',
    name: 'Risotto',
    description: 'Krämiga skålar för långsamma kvällar, med glansig finish och premiumkänsla.',
    accent: 'Lent, lyxigt och diskret dramatiskt.',
    image:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'seafood',
    name: 'Havets smaker',
    description: 'Ljusa citrontoner, skaldjur och eleganta rätter med medelhavskänsla.',
    accent: 'Friskt, salt och polerat.',
    image:
      'https://images.unsplash.com/photo-1611270634830-f0d347f298e9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'dolci',
    name: 'Efterrätter',
    description: 'Tiramisu, pistage och söta avslut som känns både italienska och festliga.',
    accent: 'Mjuka lager och cafékänsla till sista skeden.',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
  },
]

const recipeSeed = [
  {
    id: 'truffle-tagliatelle',
    title: 'Tryffeltagliatelle',
    category: 'pasta',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Silkeslen tagliatelle med mascarpone, parmesan och en djup avslutning av tryffel.',
    description:
      'En elegant pastarätt för middagar som ska kännas lite mer speciella, byggd på en blank gräddig sås och generöst med nymalen svartpeppar.',
    time: '30 min',
    difficulty: 'Medel',
    servings: 4,
    rating: 4.9,
    reviewCount: 128,
    author: 'Lucia Moretti',
    location: 'Milano',
    featured: true,
    tags: ['Middag', 'Dejt', 'Komfort'],
    ingredients: [
      '400 g färsk tagliatelle',
      '2 msk smör',
      '2 schalottenlökar, finhackade',
      '180 ml vispgrädde',
      '100 g mascarpone',
      '60 g parmesan, finriven',
      '1 msk tryffelpasta',
      'Nymalen svartpeppar',
      'Gräslök och extra parmesan till servering',
    ],
    instructions: [
      'Koka upp en stor kastrull saltat vatten och koka tagliatellen tills den precis är al dente.',
      'Smält smöret i en vid panna medan pastan kokar och låt schalottenlöken mjukna tills den är söt och glansig.',
      'Vispa ner grädde, mascarpone, parmesan och tryffelpasta tills såsen blir slät och lätt krämig.',
      'Vänd ner den varma pastan tillsammans med lite pastavatten tills allt blir blankt och väl täckt av såsen.',
      'Avsluta med svartpeppar, gräslök och extra parmesan och servera direkt.',
    ],
    comments: [
      {
        name: 'Emma',
        date: '2 dagar sedan',
        text: 'Precis den sortens pastarätt som bär en startsida. Rik men fortfarande ren i uttrycket.',
      },
      {
        name: 'Noah',
        date: '5 dagar sedan',
        text: 'Den här känns verkligen premium. Jag lade till svamp och balansen höll jättebra.',
      },
    ],
  },
  {
    id: 'vodka-rigatoni-al-forno',
    title: 'Vodkarigatoni al forno',
    category: 'pasta',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Rigatoni gratinerad i kryddig tomatgrädde med gyllene mozzarella på toppen.',
    description:
      'En varm och publikvänlig pastagratäng med lagom hetta, rund tomatsås och en tydlig ostig yta som känns inbjudande direkt.',
    time: '45 min',
    difficulty: 'Lätt',
    servings: 6,
    rating: 4.7,
    reviewCount: 91,
    author: 'Matteo Conti',
    location: 'Rom',
    featured: false,
    tags: ['Familjemiddag', 'Ugnsbakat'],
    ingredients: [
      '450 g rigatoni',
      '2 msk olivolja',
      '3 vitlöksklyftor, tunt skivade',
      '1 tsk chiliflakes',
      '120 ml vodka',
      '400 g krossade tomater',
      '180 ml vispgrädde',
      '150 g mozzarella, i bitar',
      '50 g parmesan',
      'Färsk basilika',
    ],
    instructions: [
      'Koka rigatonin tills den nästan är al dente och spara lite av pastavattnet.',
      'Bygg såsen med olivolja, vitlök, chili, vodka, krossade tomater och grädde tills den är mjuk och fyllig.',
      'Vänd ner rigatonin i såsen tillsammans med hälften av mozzarellan och parmesanen.',
      'Häll över i en form, toppa med resten av osten och baka tills ytan är gyllene och bubblig.',
      'Låt vila i fem minuter och avsluta med basilika före servering.',
    ],
    comments: [
      {
        name: 'Sara',
        date: '1 vecka sedan',
        text: 'Perfekt för vardagskvällar men känns ändå tillräckligt stylad för sajten.',
      },
    ],
  },
  {
    id: 'margherita-bianca',
    title: 'Vit margherita',
    category: 'pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Vit pizza med fior di latte, basilikaolja och en tunn krispig botten.',
    description:
      'En elegant tolkning av margherita där ren mjölksmak, friska örter och tunn krispig kant får ta huvudrollen.',
    time: '1 tim 20 min',
    difficulty: 'Medel',
    servings: 2,
    rating: 4.8,
    reviewCount: 74,
    author: 'Giulia Bassi',
    location: 'Neapel',
    featured: true,
    tags: ['Pizzakväll', 'Vegetarisk'],
    ingredients: [
      '1 pizzadeg',
      '2 msk semolinamjöl',
      '120 g fior di latte',
      '80 g ricotta',
      '2 msk basilikaolja',
      'Rivet citronskal',
      'Flingsalt',
      'Färska basilikablad',
    ],
    instructions: [
      'Sträck ut degen till en tunn rund pizza på ett underlag med semolinamjöl.',
      'Fördela ricotta och fior di latte över pizzan och lämna en tydlig kant runt om.',
      'Baka på mycket het sten eller plåt tills kanterna blir mörkt gyllene och botten krispig.',
      'Avsluta med basilikaolja, citronskal, flingsalt och färsk basilika precis före servering.',
    ],
    comments: [
      {
        name: 'Jonas',
        date: '3 dagar sedan',
        text: 'Basilikaoljan gör att den här känns mycket mer premium än en vanlig margherita.',
      },
    ],
  },
  {
    id: 'wild-mushroom-risotto',
    title: 'Risotto med skogssvamp',
    category: 'risotto',
    image:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Carnaroliris med porcini, rostade svampar och en djup jordig glans.',
    description:
      'En varm risotto med lager av umami, avrundad med smör och parmesan för den där klassiska, vågiga konsistensen.',
    time: '50 min',
    difficulty: 'Medel',
    servings: 4,
    rating: 4.9,
    reviewCount: 102,
    author: 'Elena Riva',
    location: 'Turin',
    featured: true,
    tags: ['Mysig kväll', 'Vegetarisk', 'Långkokskänsla'],
    ingredients: [
      '320 g carnaroliris',
      '1 liter varm svampbuljong',
      '250 g blandad svamp',
      '2 msk olivolja',
      '1 schalottenlök, finhackad',
      '120 ml torrt vitt vin',
      '40 g smör',
      '60 g parmesan',
      'Persilja och svartpeppar',
    ],
    instructions: [
      'Rosta svampen med olivolja, salt och peppar tills den får djup färg och karamelliserade kanter.',
      'Mjukgör schalottenlöken i en vid panna, rosta riset lätt och slå på vitt vin.',
      'Tillsätt varm buljong lite i taget och rör ofta tills riset är krämigt men fortfarande har en lätt kärna.',
      'Vänd ner den rostade svampen, smöret och parmesanen av värmen för en blank finish.',
      'Toppa med persilja och extra svartpeppar före servering.',
    ],
    comments: [
      {
        name: 'Mira',
        date: 'I går',
        text: 'Noten om konsistensen fungerar jättebra för framtida receptsidor.',
      },
    ],
  },
  {
    id: 'charred-peach-burrata-bruschetta',
    title: 'Bruschetta med grillad persika och burrata',
    category: 'antipasti',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Grillad persika, burrata och het honung på rostat bröd med olivolja.',
    description:
      'En ljus förrätt där krämig burrata möter rökig frukt och färska örter i ett modernt italienskt småplock.',
    time: '20 min',
    difficulty: 'Lätt',
    servings: 4,
    rating: 4.6,
    reviewCount: 58,
    author: 'Sofia Ricci',
    location: 'Florens',
    featured: false,
    tags: ['Aperitivo', 'Sommar'],
    ingredients: [
      '1 rustikt surdegsbröd',
      '2 mogna persikor, halverade',
      '1 burrata',
      '2 msk olivolja',
      '1 msk het honung',
      'Färsk basilika',
      'Rostade pistagenötter',
      'Flingsalt och svartpeppar',
    ],
    instructions: [
      'Rosta tjocka skivor surdegsbröd tills kanterna blir gyllene och krispiga.',
      'Grilla persikorna i grillpanna tills de får lätt rökig smak och mjuk yta.',
      'Riv burratan över brödet och toppa med skivade persikor.',
      'Avsluta med olivolja, het honung, basilika, pistagenötter, salt och svartpeppar.',
    ],
    comments: [
      {
        name: 'Lina',
        date: '4 dagar sedan',
        text: 'Det här hade fungerat jättebra bredvid hero-sektionen eftersom färgerna är så starka.',
      },
    ],
  },
  {
    id: 'lemon-linguine-frutti-di-mare',
    title: 'Citronlinguine frutti di mare',
    category: 'seafood',
    image:
      'https://images.unsplash.com/photo-1611270634830-f0d347f298e9?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Linguine med räkor, musslor, chili, persilja och blank citronsmörsås.',
    description:
      'En kustnära pastarätt som känns lätt, glansig och precis lagom festlig för en lång middag med vänner.',
    time: '35 min',
    difficulty: 'Medel',
    servings: 4,
    rating: 4.8,
    reviewCount: 86,
    author: 'Marco Bellini',
    location: 'Amalfikusten',
    featured: false,
    tags: ['Skaldjur', 'Helgmiddag'],
    ingredients: [
      '400 g linguine',
      '250 g räkor, skalade',
      '500 g musslor, rengjorda',
      '3 vitlöksklyftor, tunt skivade',
      '1 citron, skal och saft',
      '120 ml vitt vin',
      '2 msk smör',
      'Persilja, chiliflakes och olivolja',
    ],
    instructions: [
      'Koka linguinen i saltat vatten tills den är al dente.',
      'Fräs vitlök och chili i olivolja och lägg sedan i räkorna tills de precis blir rosa.',
      'Tillsätt musslor och vin, lägg på lock och ånga tills skalen öppnar sig.',
      'Vänd ner smör, citronskal, citronsaft, persilja och den varma pastan med lite pastavatten.',
      'Servera direkt medan allt fortfarande är blankt och doftande.',
    ],
    comments: [
      {
        name: 'Theo',
        date: '6 dagar sedan',
        text: 'Väldigt stark kategorikänsla om vi senare vill bygga en egen havssida.',
      },
    ],
  },
  {
    id: 'tiramisu-verrine',
    title: 'Espressotiramisu i glas',
    category: 'dolci',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Lager av mascarponekräm och espressoindränkta kex serverade i eleganta glas.',
    description:
      'En mer polerad dessertservering som ger klassisk tiramisu ett redaktionellt uttryck utan att tappa sin cafékänsla.',
    time: '25 min + kylning',
    difficulty: 'Lätt',
    servings: 6,
    rating: 4.9,
    reviewCount: 144,
    author: 'Alessia Romano',
    location: 'Bologna',
    featured: true,
    tags: ['Dessert', 'Förbered i förväg'],
    ingredients: [
      '250 g mascarpone',
      '200 ml vispad grädde',
      '70 g socker',
      '2 shots espresso, avsvalnade',
      '16 savoiardikex',
      'Kakaopulver',
      'Mörka chokladspån',
    ],
    instructions: [
      'Vispa mascarpone och socker slätt och vänd sedan ner den lätt vispade grädden.',
      'Doppa kexen snabbt i avsvalnad espresso så att de behåller sin struktur.',
      'Varva kexbitar och mascarponekräm i glasen tills de är fyllda.',
      'Kyl tills desserten satt sig och pudra sedan över kakao och chokladspån.',
    ],
    comments: [
      {
        name: 'Felix',
        date: 'I dag',
        text: 'Perfekt för den mer premiumbetonade dessertdelen. Presentationen i glas känns lyft.',
      },
      {
        name: 'Ava',
        date: '1 vecka sedan',
        text: 'Den här vore fin i en framtida karusell tillsammans med fler dolci-recept.',
      },
    ],
  },
  {
    id: 'pistachio-cannoli',
    title: 'Cannoli med pistage',
    category: 'dolci',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Krispiga cannoliskal fyllda med ricottakräm, apelsinzest och hackad pistage.',
    description:
      'En dessert som landar mellan konditoriklassiker och modern styling, med tydlig kontrast mellan krisp och krämighet.',
    time: '40 min',
    difficulty: 'Svår',
    servings: 8,
    rating: 4.7,
    reviewCount: 63,
    author: 'Bianca Serra',
    location: 'Sicilien',
    featured: false,
    tags: ['Bakverk', 'Fest'],
    ingredients: [
      '8 cannoliskal',
      '300 g ricotta',
      '90 g florsocker',
      '1 apelsin, finrivet skal',
      '60 g pistagenötter, hackade',
      'Mörka chokladchips',
      'Florsocker till servering',
    ],
    instructions: [
      'Låt ricottan rinna av tills den blir tjock och blanda sedan med florsocker och apelsinskal.',
      'Vänd ner pistage och chokladchips och kyl tills fyllningen är tillräckligt fast för att spritsas.',
      'Spritsa fyllningen i båda ändarna av skalen precis före servering så att de förblir krispiga.',
      'Rulla ändarna i extra pistage och pudra lätt med florsocker.',
    ],
    comments: [
      {
        name: 'Oscar',
        date: '5 dagar sedan',
        text: 'Det här skulle bli ett starkt sista kort i ett dessertflöde.',
      },
    ],
  },
]

const categoryLookup = Object.fromEntries(categorySeed.map((category) => [category.slug, category]))

export const recipes = recipeSeed.map((recipe) => ({
  ...recipe,
  categoryLabel: categoryLookup[recipe.category]?.name ?? recipe.category,
}))

export const categories = categorySeed.map((category) => ({
  ...category,
  recipeCount: recipes.filter((recipe) => recipe.category === category.slug).length,
}))

export const featuredRecipes = recipes.filter((recipe) => recipe.featured)

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug.toLowerCase())
}

export function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id)
}

export function getRecipesByCategory(category) {
  return recipes.filter((recipe) => recipe.category === category.toLowerCase())
}

export function getRelatedRecipes(recipeId, category) {
  const sameCategory = recipes.filter(
    (recipe) => recipe.category === category && recipe.id !== recipeId,
  )

  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3)
  }

  const additionalRecipes = recipes.filter(
    (recipe) => recipe.category !== category && recipe.id !== recipeId,
  )

  return [...sameCategory, ...additionalRecipes].slice(0, 3)
}
