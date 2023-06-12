import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

export default function PokemonItem(props) {
 const navigate =  useNavigate();
 const item = props.item;
 const [singleData, setSingleData] = useState(null);
 const [liked, setLiked] = useState(false);

 function singleFetch (){
  const url = item.url;
  axios.get(url)
  .then((response) => {
    console.log(response, 'za item');
    if(response && response.data && response.data.id){
      //validation of response
      setSingleData(response.data)
    }
  })
 }

 useEffect(() => {
  singleFetch();
 }, [item])

 
 let imgUrl = 'https://placehold.co/200x200';
 if(singleData ){
   let imgCode = ('000' + singleData.id).slice(-3);
  imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgCode}.png`;
 }

 function toggleFav (id) {
   let oldFav = [];
   try {
    const json = window.localStorage.getItem('pokemon_app_favs');
    const decodedJson = JSON.parse(json);
    if(Array.isArray(decodedJson)){
      oldFav = decodedJson;
    }
   } catch (error) {
    console.log("greska pri citanju local storage");
   }
   //preuzeli prethodni favorite
   let newFav = [];
   if(oldFav.includes(id)){
    //vec postoji znaci brisemo ga
     newFav = oldFav.filter(item => item !== id);
     setLiked(false);
   }else{
    //ne postoji zanci lajkujemo ga
      newFav = [...oldFav, id];
      setLiked(true);
   }
   //izmenili smo fav u promenljivoj i sada cuvamo i u state i u local storage
   try {
    const json = JSON.stringify(newFav);
    window.localStorage.setItem('pokemon_app_favs', json);
   } catch (error) {
    
   }
 }

 useEffect(()=> {
  if(singleData && singleData.id){
    //ovo pozivamo da bi pokupili staro stanje iz fav
    try {
      const json = window.localStorage.getItem('pokemon_app_favs');
      const decodedJson = JSON.parse(json);
      if(Array.isArray(decodedJson)){
       if (decodedJson.includes(singleData.id)) {
        // znaci postoji od ranije u fav
        setLiked(true);
       } else {
        //nije medju lajkovanim
        setLiked(false);
       }
      }
     } catch (error) {
      console.log("greska pri citanju local storage");
     }
  }
 }, [singleData])
  

  return (
    <div>
      {
        singleData ? (
          <div key={singleData.name} className="pokemonItem" id={singleData.name} > <p >{singleData.name}</p>
              <img src={imgUrl} alt='' className='pokemonImg'></img>
              {/* <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png'></img> */}
                <button onClick={()=> {
                  navigate(`/pokemon/${singleData.id}`);
                }}>More Info</button>
                <button onClick={() => {
                  toggleFav(singleData.id);
                }}>{liked ? 'Unlike' : 'Like'}</button>
               
              </div>
        ) : (
          <div>Spinner...</div>
        )
      }
       
    </div>
  )
}
