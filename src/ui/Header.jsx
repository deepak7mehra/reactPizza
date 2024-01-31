import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header(){
    return (
        <header className=" flex items-center justify-between bg-yellow-500 uppercase border-b-2 border-stone-200 px-4 py-3">
            <Link className="tracking-widest" to="/">Fast React Pizza Co.</Link>
            <SearchOrder/>
            <Username/>
        </header>
    )

}

export default Header;