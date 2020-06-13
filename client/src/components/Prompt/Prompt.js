import React from 'react';
import './Prompt.css';

import Button from '../Button/Button.js';

function Prompt(props) {
  return (
    <div className="Prompt">
      <h2 className="Prompt-date">{props.date}</h2>
      {/* {
          props.image ? (
            <img src={props.image} alt="card" />
          ) : (
            null
          )
      } */}
      <div className="Prompt-daily">
        {props.children}
        {
            props.buttonText ? (
              <Button onClick={props.onButtonClick}>
                {props.buttonText}
              </Button>
            ) : (
              null
            )
        }
      </div>
    </div>
  );
}

export default Prompt;
