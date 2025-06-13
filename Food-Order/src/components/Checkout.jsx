import { useContext, useActionState } from "react";  //useActionState: to get information about the current form status, 
// so whether it's pending or not. can use formStatus too 
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting"
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function Checkout({ name, quantity, price, onIncrease, onDecrease }) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        // isLoading: isSending,
        error,
        sendRequest,
        clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkoutAction(prevState, formData) {

        // function handleSubmit(event) {
        // event.preventDefault();
        // const formData = new FormData(event.target);
        const constomerData = Object.fromEntries(formData.entries());//{email: test@example.com}

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: constomerData
            }
        }));


        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'

        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: cartCtx.items,
        //             customer: constomerData
        //         }
        //     })
        // })

    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null) //inial form state

    let actions = (<>
        <Button type="button" textOnly onClick={handleClose}> Close</Button>
        <Button > Submit Order</Button>
    </>);

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return (<Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you via email within the next few mins</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Close</Button>
            </p>
        </Modal>);
    }
    return (<Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        {/* <form onSubmit={handleSubmit}> */}
        <form action={formAction}>

            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="name" />
            <Input label="Email Address" id="email" type="email" />
            <Input label="Street" id="street" type="text" />
            <div className="control-row">
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />

            </div>
            {error && <Error title="Failed to submit the order" message={error} />}
            <p className="modal-actions">
                {actions}
            </p>

        </form>
    </Modal>);
}