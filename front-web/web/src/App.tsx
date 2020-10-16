import React from 'react';

import './styles/global.css';

import Routes from './routes';
/*
interface TitleProps {
    text: string;
}

// componente filho
function Title(props: TitleProps) {
    return (
      <h1>{props.text}</h1>
    )
}
*/

// componente pai
function App() {
  return (
      <Routes />
  );
}

export default App;
