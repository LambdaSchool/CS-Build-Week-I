import React from 'react';
import './form.css';

const Form = (props) => {
  return(
    <form className='form' onSubmit={props.updateGridDimension}>
      Colums:
    <input type="text" name="columns"/><br/>
      Rows:
    <input type="text" name="rows"/>
    <input type="submit" value="Submit"/>
    </form>
  )
}

export default Form;
