import { useState, memo, useCallback, useMemo, useEffect } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import CounterHistory from './CounterHistory.jsx';

import { log } from '../../log.js';

//useCallback   This hook can be used to avoid the recreation of a function
//it is sometimes needed if you have a function as a dependency of useEffect.
function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
//memo will take a look at the old prop value and new prop value if change then execute 
//Memo only prevents function executions that are triggered by the parent component, 
//It does not care about internal changes. But external changes
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]); //to prevent their execution. if no value change

  // useEffect(() => { //execute at last , 2 times initialCount change , so 2 time call
  //   setCounterChanges([{ value: initialCount, id: Math.random() * 1000 }])
  // }, [initialCount]);
  const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([{ value: initialCount, id: Math.random() * 1000 }]);
  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    setCounterChanges((prevCounterChanges) => [{ value: -1, id: Math.random() * 1000 }, ...prevCounterChanges]);
  }, [])

  const handleIncrement = useCallback(function handleIncrement() {
    setCounterChanges((prevCounterChanges) => [{ value: 1, id: Math.random() * 1000 }, ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});
export default Counter;