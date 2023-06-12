import { useEffect, useState } from 'react';
import './landingPage.css';
import axios from 'axios';
import PokemonItem from '../PokemonItem/PokemonItem';


export const LandingPage = (props) => {
  const pokemon = props.pokemon;
  const pageNumber = props.pageNumber;
  const [pokemonList, setPokemonList] = useState([]);

  function listFetch(pageNumber) {
    // for (var id = 1; id < pokemon.length; id++) {
      // axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      //   console.log(response);

      // })
   // }
   const url = 'https://pokeapi.co/api/v2/pokemon?offset=' + ((pageNumber - 1) * 24) + '&limit=24';
   axios.get(url)
   .then((response) => {
    console.log('stigao response na landing stranicu', response);
    if(response && response.data && response.data.results && Array.isArray(response.data.results)){
      //validation of response
      setPokemonList(response.data.results);
    }
   })

  }

  useEffect(()=> {
    listFetch(pageNumber);
  }, [pageNumber])

 

  return (
    <div className="landingPage">
      {
        <div className='pokemonList'>
          {pokemonList.map((item, index) => {
            return (
             <PokemonItem key={index} item={item} />

            )
          })}
        </div>


      }
    </div>
  );
}