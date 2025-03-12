import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const plasticTypes = ["PET", "PE", "PP", "PC", "PVC"];

const RecyclePage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("");
  const [list, setList] = useState<{ type: string; amount: number }[]>([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (amount > 0 && selectedType) {
      setList([...list, { type: selectedType, amount }]);
      setAmount(0);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 p-4 pt-20">
      <div className="bg-orange-300 p-6 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-center text-2xl font-bold text-white">Recycle Credit</h2>

        {/* Amount Selector */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Amount</h3>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <Button className="bg-red-400 px-3 py-2 rounded-md" onClick={() => setAmount(amount > 0 ? amount - 1 : 0)}>
              ➖
            </Button>
            <span className="text-xl font-bold">{amount}</span>
            <Button className="bg-green-400 px-3 py-2 rounded-md" onClick={() => setAmount(amount + 1)}>
              ➕
            </Button>
          </div>
        </div>

        {/* Select Plastic Type */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Select a type of plastic</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {plasticTypes.map((type) => (
              <button
                key={type}
                className={`px-3 py-1 border rounded-md ${
                  selectedType === type ? "bg-cyan-400 text-white" : "bg-gray-200"
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Add Button */}
        <div className="mt-4 flex justify-center">
          <Button className="bg-slate-600 text-white px-6 py-2 rounded-lg" onClick={handleAdd}>
            ADD
          </Button>
        </div>

        {/* List of Items */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">List</h3>
          {list.length === 0 ? (
            <p className="text-gray-500 text-sm">No items added yet.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {list.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-1">
                  <span>{item.type} - {item.amount} bottle(s)</span>
                  <button
                    className="text-red-500"
                    onClick={() => setList(list.filter((_, i) => i !== index))}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Confirm Order Button */}
        <div className="mt-4 flex justify-center">
          <Button
            className="bg-slate-600 text-white px-6 py-2 rounded-lg"
            onClick={() => navigate("/confirmation")}
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecyclePage;
