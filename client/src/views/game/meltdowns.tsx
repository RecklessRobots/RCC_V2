/*eslint-disable*/
import React from 'react';

let tokens=Number;

const Meltdowns = ({ tokens }: { tokens: number }) => {
  
  const meltdowns = [];

  for (let i = 0; i < tokens; i++) {
    meltdowns.push(
      <span key={i} role="img" aria-label="">
        ⭐
      </span>
    );
  }

  return <div>{meltdowns}</div>;
};

export default Meltdowns;