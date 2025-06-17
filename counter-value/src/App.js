import { Fragment } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';
import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth'
import UserProfile from './components/UserProfile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from './store/counter-action';
function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const counter = useSelector(state => state.counter.counter);
  const counterState = useSelector(state => state.counter);
  const dispatch=useDispatch();
  // useEffect(() => {
  // const sendCartData = async () => {
  //   const resp = await fetch('https://databasw-2554c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
  //     { method: 'PUT', body: JSON.stringify({ counter }) })
  // };

  // if (resp.ok == false) {
  //   //throw new Error('Sending cart data  failed.')
  // }
  // // const respData=await resp.json();
  // sendCartData().catch(error => {
  //   console.log(error)
  // })
  // }, [counter])
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {

    if (counterState.changed) {
      dispatch(sendCartData({ counter }));
    }

  }, [dispatch, counterState]);
  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}

      <Counter />

    </Fragment>

  );
}

export default App;
