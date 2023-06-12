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

   let imgUrl = 'https://placehold.co/200x200';
   if(singleData ){
     let imgCode = ('000' + singleData.id).slice(-3);
    imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgCode}.png`;
   }
  return(
    <div className="pokemonSingleList">
      <h1> here you can explore more about your choosen pokemon -- id numb - {id} </h1>
      {
        singleData ? (
          <div className='pokemonItem'>
           <p> {singleData.name}</p>
           
           <img src={imgUrl} />
          </div>
        ) : (
          <div>Spinner</div>
        )
      }
    </div>
    
  )
}