import './landingPage.css';
import axios from 'axios';


export const LandingPage = (props) => {
  const pokemon = props.pokemon;




  function singleFetch() {
    for (var id = 1; id < pokemon.length; id++) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        console.log(response);

      })
    }

  }


  return (
    <div className="landingPage">
      {
        <div className='pokemonList'>
          {pokemon.map((p, index) => {
            return (
              <div key={p.name} className="pokemonItem" id={p.name} onClick={singleFetch}> <p >{p.name}</p>
              <img src='https://placehold.co/200x200' alt='' className='pokemonImg'></img>
              {/* <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png'></img> */}
                <button>More Info</button>
                <button>Like</button>
               
              </div>

            )
          })}
        </div>


      }
    </div>
  );
}