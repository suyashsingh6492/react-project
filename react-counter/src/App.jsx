import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureConter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetcount(newCount) {
    setChosenCount(newCount); //this will execute eventually but not instantly 
    setChosenCount((prev)=>prev+1); //this will execute eventually but not instantly 
  }


  return (
    <>
      <Header />
      <main>
        <ConfigureConter onSet={handleSetcount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
