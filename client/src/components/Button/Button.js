import React from 'react';
import './Button.css';

function Button(props) {
  let className = 'Button';

  if (props.type === 'gray') {
    className = 'Button Button--gray';
  }
  if (props.type === 'primary') {
    className = 'Button Button--primary';
  }

  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Button;
