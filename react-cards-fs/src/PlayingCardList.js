import React, { useState } from "react";

import {useAxios, useLocalStorage} from "./hooks/useAxios";
import PlayingCard from "./PlayingCard";

import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const url = "https://deckofcardsapi.com/api/deck/new/draw/";
  const minRes = (response) => {
    const image = response.data.cards[0].image;
    return {image}
  }

  const [cards, setCards, deleteCards] = useAxios(url, minRes, 'cards');
 
  
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={setCards}>Add a playing card!</button>
        <button onClick={deleteCards}>Delete all cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
