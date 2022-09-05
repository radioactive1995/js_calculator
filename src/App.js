import logo from './logo.svg';
import './App.css';
import Button from './Button'
import React, { useReducer, useEffect, useState } from 'react';



const evaluation = (num) => {
  try {
    return eval(num)
  }
  catch(err) {
    return 'INVALID'
  }
}

const lastChar = (char) => ['+','-','*','/'].indexOf(char) !== -1

const reducer = (state, action) => {
  switch (action.type) {
    case 'input': {
      //Kan ikke legge til 0 når input default er 0, f.eks ikke lov -> 00
      if (state.input === '' && action.value === 0)
      { 
        console.log('første feilplass')
        return {sum: state.sum, input: state.input, operatorString: '', decimalAllowed: state.decimalAllowed }
      } 
      console.log('Andre  feilplass')
      return {sum: state.sum, input: state.input + action.value, operatorString: '', decimalAllowed: state.decimalAllowed }
    }

    case 'operatorString': {
      //Vi tillater +-, -- , *- , /-
      if (state.operatorString.length === 1 && action.value === '-') {
        console.log('første if')
        return {sum: state.sum, input: state.input + action.value, operatorString: state.operatorString + action.value, decimalAllowed: true  }
      }

      else if (state.operatorString.length === 1 && action.value !== '-') {
        console.log('Andre if')
        return {sum: state.sum, input: state.input.slice(0,-1) + action.value, operatorString:  action.value, decimalAllowed: true  }
      }

      else if (state.operatorString.length === 0) {
        console.log('Tredje if')
        return {sum: state.sum, input: state.input + action.value, operatorString:  action.value, decimalAllowed: true }
      }

      else if (state.operatorString.length === 2) {
        console.log('Fjerde if')
        return {sum: state.sum, input: state.input.slice(0,-2) + action.value, operatorString: action.value, decimalAllowed: true  }
      }
      //return {sum: state.sum, input: state.input + action.value, operatorString: state.operatorString + action.value }
    }

    case 'decimal': {
      if (state.input === '' && state.decimalAllowed) {
        return {sum: state.sum, input: '0' + action.value, operatorString: state.operatorString, decimalAllowed: false }
      }

      else if (state.input !== '' && state.decimalAllowed && lastChar(state.input.slice(-1))) {
        return {sum: state.sum, input: state.input + '0' + action.value, operatorString: state.operatorString , decimalAllowed: false }
      }

      else if (state.input !== '' && state.decimalAllowed && !lastChar(state.input.slice(-1))) {
        return {sum: state.sum, input: state.input + action.value, operatorString: state.operatorString , decimalAllowed: false }
      }

      else if (!state.decimalAllowed) {
        return {sum: state.sum, input: state.input, operatorString: state.operatorString , decimalAllowed: false }
      }

    }

    case 'equals': {
      return {sum: evaluation(state.input), input: state.input, operatorString: state.operatorString }
    }

    case 'clear': {
      return {sum: 0, input: '', operatorString: '' }
    }

  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    sum: 0, 
    input: '',
    operatorString: '',
    decimalAllowed: true,
  })

  const stringInput = '2+5-45*57/3'
  //const stringInput = '5+5'
  

  return (
    <div className="container">
      <div className='display'>
        <p className='outputScreen'>{state.sum}</p>
        <p className='formulaScreen'>{state.input !== '' ? state.input : '0'}</p>
      </div>
      <div className='grid-buttons'>
        <Button id={'add'} element={'+'} dispatch={dispatch} />
        <Button id={'subtract'} element={'-'} dispatch={dispatch} />
        <Button id={'multiply'} element={'*'} dispatch={dispatch} />
        <Button id={'divide'} element={'/'} dispatch={dispatch} />
        <Button id={'seven'} element={7} dispatch={dispatch} />
        <Button id={'eight'} element={8} dispatch={dispatch} />
        <Button id={'nine'} element={9} dispatch={dispatch} />
        <Button id={'equals'} element={'='} dispatch={dispatch} />
        <Button id={'four'} element={4} dispatch={dispatch} />
        <Button id={'five'} element={5} dispatch={dispatch} />
        <Button id={'six'} element={6} dispatch={dispatch} />
        <Button id={'one'} element={1} dispatch={dispatch} />
        <Button id={'two'} element={2} dispatch={dispatch} />
        <Button id={'three'} element={3} dispatch={dispatch} />
        <Button id={'zero'} element={0} dispatch={dispatch} />
        <Button id={'decimal'} element={'.'} dispatch={dispatch} />
        <Button id={'clear'} element={'AC'} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
