import { createStore } from 'redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { counterActions } from './counter-slice'
export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const resp = await fetch('https://databasw-2554c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');
            if (resp.ok == false) {
                //throw new Error('Sending cart data  failed.')
            }
            const data = await resp.json();
            return data; 
        };
        try {
          const cartData= await fetchData();
          console.log(cartData);
          dispatch(counterActions.getData(cartData));
        } catch (error) {
            
        }
    }
}
export const sendCartData = (cartData) => {
    return async (dispatch) => {
        console.log("notification")
        // const resp = await fetch('https://databasw-2554c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        //     {
        //         method: 'PUT',
        //         body: JSON.stringify({ cartData })
        //     });
        const sendRequest = async () => {

            const resp = await fetch('https://databasw-2554c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                { method: 'PUT', body: JSON.stringify({ cartData }) })


            if (resp.ok == false) {
                //throw new Error('Sending cart data  failed.')
            }
            // const respData=await resp.json();
            // sendCartData().catch(error => {
            //     console.log(error)
            // })
        };

        try {
            await sendRequest();
        } catch (error) {
            console.error("error " + error)
        }


    };



}

