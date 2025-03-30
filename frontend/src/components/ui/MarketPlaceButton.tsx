import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

function MarketPlaceButton() {
    return (
        <Link to="/marketplace">
            <button className="flex items-center gap-2 bg-black text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-800 transition">
                <FaStore className="text-white text-2xl" />
                MARKET PLACE
            </button>
        </Link>
    );
}

export default MarketPlaceButton;
