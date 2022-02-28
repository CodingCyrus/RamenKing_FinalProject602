import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch , useSelector} from 'react-redux'
import { placeOrder } from '../actions/placeorderActions';

//front end code to integrate stripe react into application for payments
export default function Checkout({ pricetotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer)
  const dispatch = useDispatch()
  //handle token code from stripe payments
  function tokenHandler(token) {
    console.log(token);
    dispatch(placeOrder(token, pricetotal))
  }

  return (
    <div>
      <StripeCheckout
        amount={pricetotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51KXgvyDYBllv1vKGUo36yDtQrHKM9WQod5coGPSJsfe1zpECl4h1OkzOyZeHEGgbvVI0mrgVN4uC2UzmcZET437v002S1dzfH2'
        currency='usd'
      >

        <button className='btn'>Pay Now</button>
      </StripeCheckout>

    </div>
  )
}
