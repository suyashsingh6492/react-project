import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header() {

    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    //that allows us to reduce an array to a single value
    const totalCartItem = cartCtx.items.reduce((totalNumberOfItems, item) => { 
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (<header id="main-header">
        <div id="title">
            <img src={logoImg} alt='A resturant' />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItem})</Button>

        </nav>
    </header>);
}