import React from 'react'

const Cell = ({cell, click, i , j}) => {
  
  
    let stage = 'stageOne'
    return (
      <div className={`cell ${cell.status?stage:'dead'}`} onClick={()=>click(i, j)}/>
    )
    
  
  }

  export default Cell
