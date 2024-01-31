/* import { useState } from "react";
 */
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
);

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store';
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {

  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority? totalCartPrice*0.2:0;
  const totalPrice = totalCartPrice+priorityPrice;

  
  const cart = useSelector(getCart)
  const {
    username,
    status: addressStatus,
    position,
    address,
  } = useSelector((state)=>state.user);
  const isLoadingAddress = navigation.state === 'submitting';

  if (!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6" >
      <h2 className="text-xl font-semibold">Ready to order? Let's go!</h2>


      <Form method="POST" /*action="/order/new"*/>
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className=" align-middle sm:basis-40">First Name</label>
          <input className="input grow"  type="text" defaultValue={username} name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label  className="align-middle sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-xs  bg-red-100 rounded-md inline text-red-700">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col relative sm:flex-row sm:items-center">
          <label className="align-middle sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full"
            disabled={isLoadingAddress}
            type="text"
            default = {address} 
            name="address" required />
          </div>
          <span
          disabled={isLoadingAddress}
           className="absolute right-[3px] z-50 ">
          { !position.latitude && !position.longitude && <Button type="small" onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress())
          }}>
              Get Position
          </Button>}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 my-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
          {isSubmitting? 'placing order': `Order now $${totalPrice}`}
          </Button>
          
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)){
    errors.phone = "please give correct phone number";
  }

  if (Object.keys(errors).length>0) return errors;

  // if every thing goes good

  const newOrder= await createOrder(order);

  // since we can can not use react hook in the regular function
  // we have directly import store  function

  // DO NOT OVERUSE leads to poor performance  
  store.dispatch(clearCart());
  

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
