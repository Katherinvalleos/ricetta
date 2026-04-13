import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipes";

function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes().then(setRecipes);
    }, []);

    return (
        <div>
            <h1>Recept</h1>
            {recipes.map(r => (
                <p key={r.id}>{r.title}</p>
            ))}
        </div>
    );
}

export default Home;