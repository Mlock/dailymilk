import React from 'react';
import './.css';

import Button from '../Button/Button.js';

function Card(props) {
  return (
    <div className="Card">
      <h1 className="Card-title">{props.title}</h1>
      {
          props.image ? (
            <img src={props.image} alt="card" />
          ) : (
            null
          )
      }
      <div className="Card-info">
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

export default Card;
