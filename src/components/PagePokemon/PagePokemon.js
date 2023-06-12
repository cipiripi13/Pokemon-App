import { useParams } from 'react-router'
import './PagePokemon.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const PagePokemon = () => {
  const {id} = useParams();
  const [singleData, setSingleData] = useState(null);

  function singlePokemonFetch (id){
    // const url = item.url;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios.get(url)
    .then((response) => {
      console.log(response, 'za pokemonPage');
      if(response && response.data && response.data.id){
        //validation of response
        setSingleData(response.data)
      }
    })
   }
  
   useEffect(() => {
    singlePokemonFetch(id);
   }, [id])


  return(
    <div className="pokemonInfo">
      Pokemon Info {id}
      {
        singleData ? (
          <div>Info</div>
        ) : (
          <div>Spinner</div>
        )
      }
    </div>
  )
}