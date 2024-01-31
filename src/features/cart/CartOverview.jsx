import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  if (!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between" >
      <p className=" font-semibold space-x-4 text-stone-300">
        <span>{totalCartQuantity}</span>
        <span>{totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
