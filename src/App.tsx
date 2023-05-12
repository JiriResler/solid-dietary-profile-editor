import React from 'react';
import Login from './Login';


const App: React.FC = ({ onLocaleChanged }) => {
  return (
    <>
      <Login onLocaleChanged={onLocaleChanged}/>
    </>
  );
};

export default App;
