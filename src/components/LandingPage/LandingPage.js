import './landingPage.css'

export const LandingPage = (props) => {
  const pokemon = props.pokemon;
  console.log( pokemon);

  
  return (
    <div className="landingPage">
      {
      <div className='pokemonList'>
        {pokemon.map(p => {
         return(
         <div key={p.name}  className='pokemonItem'> <p >{p.name}</p> </div>
         
         )
        })}
      </div>
        
      
      }
    </div>
  );
}