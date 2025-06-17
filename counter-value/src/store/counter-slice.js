import { createStore } from 'redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'


const initialCounterState = { counter: 0, showCounter: true, changed: false };

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        getData(state, action) {
            console.log(action);
            state.counter = action.payload.cartData.counter;

            state.changed=false;

        },
        increment(state, action) {
            state.counter++;
            state.changed=true;
        },
        decrement(state) {
            state.counter--;
            state.changed=true;

        },
        increase(state, action) {
            state.counter += action.payload;
            state.changed=true;

        },
        toggleCounter(state) {
            state.changed=false;
            state.showCounter = !state.showCounter
        }
    }
});


export const counterActions = counterSlice.actions

export default counterSlice.reducer; 
