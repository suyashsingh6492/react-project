import { createContext, useReducer, useState } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { },
});



function cartReducer(state, action) { //automatically pass by react
    if (action.type === 'ADD_ITEM') {
        //update the state to new item 
        // state.items.push(action.item) //you make a change before you're done executing the code
        const existingCartItemIndex = state.items.findIndex((item) => item.id == action.item.id);
        const updatedItems = [...state.items];//copy of old array
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems }
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id == action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity == 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems }

    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }


    return state;

}
export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [], }); //move that state management logic out of this component function.

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item })

    }
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id })

    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' })
    }

    //whenever this cart state changes
    // this here will also change and this new context will be distributed to all interested components.
    const cartContext = { items: cart.items, addItem, removeItem, clearCart }
    console.log(cartContext)
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext