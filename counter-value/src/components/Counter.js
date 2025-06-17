import classes from './Counter.module.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { Component } from 'react'
import { counterActions } from '../store/counter-slice'
const Counter = () => {
  //const counter = useSelector(state => state.counter);
  const counter = useSelector(state => state.counter.counter);

  const showCounter = useSelector(state => state.counter.showCounter);

  const dispatch = useDispatch();

  const incrmentHandler = () => {
    // dispatch({ type: 'increment' })
    dispatch(counterActions.increment())
    console.log(counter);

  }
  const increaseHandler = () => {
   // dispatch({ type: 'increase', amount: 5 })
    dispatch(counterActions.increase(10))

  }
  const decrmentHandler = () => {
    // dispatch({ type: 'decrement' })
    dispatch(counterActions.decrement())


  }
  const toggleCounterHandler = () => {
    //  dispatch({ type: 'toggle' })
    dispatch(counterActions.toggleCounter())

  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && (<div className={classes.value}>{counter}</div>)}
      <div>
        <button onClick={incrmentHandler}> Increment</button>
        <button onClick={increaseHandler}> Increase by 5</button>
        <button onClick={decrmentHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// class Counter extends Component {
//      incrmentHandler(){
//       this.props.increment();

//   }
//  decrmentHandler(){
//          this.props.decrement();


//   }

//   toggleCounterHandler(){

//   }
//   render(){
//     return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{this.props.counter}</div>
//       <div>
//         <button onClick={this.incrmentHandler.bind(this)}> Increment</button>
//         <button onClick={this.decrmentHandler.bind(this)}>Decrement</button>
//       </div>
//       <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
//     </main>
//   );
//   }
// }

export default Counter;
//now connect when executed, will actually return a new function as a value,we execute this returned,
// const mapStateToProps=state=>{
//   return {
//     counter: state.counter
//   };
// }
// const mapDispatchToProps=dispatch=>{
//   return {
//     increment: ()=>dispatch({type:'increment'}),
//     decrement: ()=>dispatch({type:'decrement'}),

//   }
// };
// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
//with class-based components, you can't use hooks, and then this is your equivalen
