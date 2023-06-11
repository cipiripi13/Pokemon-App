import React from 'react'
import './pagination.css'

export default function Pagination({ gotoNextPage, returntoPrevpage }) {
  var pageNum = 1;
function showPageNumb(){
  
  if(gotoNextPage){
    
  //  console.log(pageNum++);
  console.log(pageNum++);
   return pageNum++;
  }
  
}
  return (
    <div>
      {/* This says if we have previous page to load then load, if we dont have than it will show nothing */}
      {returntoPrevpage && <button onClick={returntoPrevpage}>Previous</button>}
      <button >{pageNum}</button>
      {gotoNextPage && <button onClick={() => { gotoNextPage(); showPageNumb();}}>Next</button>}
    </div>
  )
}
