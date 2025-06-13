import Cart from "./components/Cart";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      {/* //this will allow all these components and their nested child components to access this context and its properties. */}
      <CartContextProvider>


        <Header />
        <Meals />
        <Cart />
        <Checkout/>

      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
