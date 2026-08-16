import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AuthPanel from "./components/AuthPanel.jsx";
import PantryPanel from "./components/PantryPanel.jsx";
import RecipeGrid from "./components/RecipeGrid.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import FavoritesPanel from "./components/FavoritesPanel.jsx";
import Footer from "./components/Footer.jsx";
import { api } from "./api.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [apiMode, setApiMode] = useState("mock");

  const [pantry, setPantry] = useState([]);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [resultsMode, setResultsMode] = useState("mock");

  const [favorites, setFavorites] = useState([]);
  const [activeRecipeId, setActiveRecipeId] = useState(null);
  const [activeRecipeSeed, setActiveRecipeSeed] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const favoritesRef = useRef(null);

  useEffect(() => {
    api.health().then((h) => setApiMode(h.mode)).catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("lr_token");
      const username = localStorage.getItem("lr_username");
      if (!token) {
        setCheckingAuth(false);
        return;
      }
      try {
        const [p, f] = await Promise.all([api.getPantry(), api.getFavorites()]);
        setPantry(p);
        setFavorites(f);
        setUser({ username });
      } catch {
        localStorage.removeItem("lr_token");
        localStorage.removeItem("lr_username");
      }
      setCheckingAuth(false);
    })();
  }, []);

  async function onAuthed(u) {
    setUser(u);
    try {
      const [p, f] = await Promise.all([api.getPantry(), api.getFavorites()]);
      setPantry(p);
      setFavorites(f);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setTimeout(() => {
      document.getElementById("pantry")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function signOut() {
    localStorage.removeItem("lr_token");
    localStorage.removeItem("lr_username");
    setUser(null);
    setPantry([]);
    setResults([]);
    setHasSearched(false);
    setFavorites([]);
  }

  function scrollToCta() {
    const target = user ? "pantry" : "auth";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  }

  async function addPantryItem(name) {
    try {
      const item = await api.addPantryItem(name);
      setPantry((prev) => [...prev, item]);
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  async function removePantryItem(id) {
    try {
      await api.removePantryItem(id);
      setPantry((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  async function search() {
    if (pantry.length === 0) return;
    setSearching(true);
    setErrorMsg("");
    try {
      const data = await api.searchRecipes(pantry.map((p) => p.name));
      setResults(data.results);
      setResultsMode(data.mode);
      setHasSearched(true);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setSearching(false);
  }

  function openRecipe(recipeOrId, seed) {
    if (typeof recipeOrId === "string") {
      setActiveRecipeId(recipeOrId);
      setActiveRecipeSeed(seed || null);
    } else {
      setActiveRecipeId(recipeOrId.id);
      setActiveRecipeSeed(recipeOrId);
    }
  }

  function closeRecipe() {
    setActiveRecipeId(null);
    setActiveRecipeSeed(null);
  }

  async function toggleFavorite(recipe) {
    const existing = favorites.find((f) => f.recipeId === recipe.id);
    try {
      if (existing) {
        await api.removeFavorite(existing.id);
        setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
      } else {
        const fav = await api.addFavorite(recipe.id, recipe.title, recipe.image);
        setFavorites((prev) => [fav, ...prev]);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  async function removeFavoriteById(id) {
    try {
      await api.removeFavorite(id);
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  const isActiveFavorite = favorites.some((f) => f.recipeId === activeRecipeId);

  if (checkingAuth) {
    return <div className="lr-boot">setting the table…</div>;
  }

  return (
    <div className="lr-root">
      <Navbar
        user={user}
        onSignOut={signOut}
        onShowFavorites={() => favoritesRef.current?.scrollIntoView({ behavior: "smooth" })}
      />

      <Hero user={user} onCta={scrollToCta} />

      {!user && <AuthPanel onAuthed={onAuthed} />}

      {user && (
        <>
          <PantryPanel
            pantry={pantry}
            onAdd={addPantryItem}
            onRemove={removePantryItem}
            onSearch={search}
            searching={searching}
          />

          <RecipeGrid
            results={results}
            onOpenRecipe={openRecipe}
            hasSearched={hasSearched}
            mode={resultsMode}
          />

          <FavoritesPanel
            favorites={favorites}
            onOpen={openRecipe}
            onRemove={removeFavoriteById}
            panelRef={favoritesRef}
          />
        </>
      )}

      <Footer mode={apiMode} />

      <RecipeModal
        recipeId={activeRecipeId}
        initial={activeRecipeSeed}
        onClose={closeRecipe}
        isFavorite={isActiveFavorite}
        onToggleFavorite={toggleFavorite}
      />

      {errorMsg && (
        <div className="lr-toast" onClick={() => setErrorMsg("")}>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
