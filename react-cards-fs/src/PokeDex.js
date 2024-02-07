import React, { useState } from "react";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import {useAxios, useLocalStorage} from "./hooks/useAxios";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
  const minRes = response => {
    const front = response.data.sprites.front_default;
    const back = response.data.sprites.back_default;
    const name = response.data.name;
    const stats = response.data.stats.map(stat => ({
      value: stat.base_stat,
      name: stat.stat.name
    }));
    return {front, back, name, stats}
  }
  const [pokemon, setPokemon, deletePokemons] = useAxios(baseUrl, minRes)
  
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={setPokemon} empty={deletePokemons}/>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
