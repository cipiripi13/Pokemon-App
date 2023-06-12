import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonItem from '../PokemonItem/PokemonItem';


export const SearchResult = (props) => {
  const pokemon = props.pokemon;
  const pageNumber = props.pageNumber;
  const searchResults = props.searchResults;
 
  // const [pokemonList, setPokemonList] = useState([]);

  

 
 

  return (
    <div className="landingPage">
      <h1>rezultat pretrage</h1>
      {
        <div className='pokemonList'>
          {searchResults.map((item, index) => {
            return (
             <PokemonItem key={index} item={item} />

            )
          })}
        </div>
      }
      {
        searchResults.length === 0 && 
         (<div>Nothing matched your search</div>) 
        
      }
    </div>
  );
}