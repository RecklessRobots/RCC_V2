/*eslint-disable*/
import React from 'react';

let tokens1=Number;

const Hearts = ({ tokens1 }: { tokens1: number }) => {
  
  const hearts = [];

  for (let i = 0; i < tokens1; i++) {
    hearts.push(
      <span key={i} role="img" aria-label="">
        🪙
      </span>
    );
  }

  return <div>{hearts}</div>;
};

export default Hearts;