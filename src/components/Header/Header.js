import { useNavigate } from 'react-router';
import './header.css';

export const Header = ({setSortOrder, sortOrder, searchText, setSearchText}) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo" onClick={()=>{
        navigate('/');
      }}>
        <img src='https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png' className='logoImg' alt='logo'></img>
      </div>
      
      <div className='searchBar'>
      <input 
      type='search'
      value={searchText}
      onChange={(event)=>{
        setSearchText(event.target.value);
      }}
      />
      <select value={sortOrder} onChange={(event) => {
        setSortOrder(event.target.value)
      }}>
        
        <option value={'A-Z'}>A-Z</option>
        <option value={'Z-A'}>Z-A</option>
        <option value={'DEFAULT'}>Default</option>
      </select>
      </div>
      
    </div>
  )
}