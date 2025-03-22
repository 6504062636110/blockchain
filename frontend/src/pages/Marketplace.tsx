import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/ui/dialog";



const products = [
  { id: 1, name: "Milk", price: 22 },
  { id: 2, name: "Cereal", price: 45 },
  { id: 3, name: "Banana", price: 9 }
];

export default function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [carbonCredit, setCarbonCredit] = useState<number>(1);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity
  };

  const discount = Math.min(Math.floor(carbonCredit / 100), selectedProduct ? selectedProduct.price * 0.2 : 0);
  const totalPrice = selectedProduct ? selectedProduct.price * quantity - discount : 0;

  return (
    <div className="min-h-screen p-10 flex flex-col justify-center items-center">
      
  
      {/* สินค้า */}
      <div className="flex justify-center gap-6">
        {products.map((product) => (
          <Dialog key={product.id}>
            <DialogTrigger asChild>
              <div
                className="cursor-pointer bg-white p-6 rounded-xl shadow-md w-56 hover:scale-105 transition"
                onClick={() => handleSelectProduct(product)}
              >
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-500 text-sm">Price (THB)</p>
                <p className="text-lg font-bold">{product.price}</p>
              </div>
            </DialogTrigger>
  
            {/* Modal Popup */}
            {selectedProduct && (
              <DialogContent className="p-6">
                <DialogTitle className="text-xl font-bold">List</DialogTitle>
                <div className="mt-2 border-b pb-2">
                  <p>
                    <span className="font-bold">Product name:</span> {selectedProduct.name}
                  </p>
                  <p>
                    <span className="font-bold">Quantity (Piece):</span> {quantity}
                  </p>
                  <p>
                    <span className="font-bold">Price (THB):</span> {selectedProduct.price}
                  </p>
                </div>
  
                {/* Carbon Credit */}
                <div className="flex justify-between mt-3">
                  <span className="font-bold">Carbon credit</span>
                  <input
                    type="number"
                    value={carbonCredit}
                    onChange={(e) => setCarbonCredit(Number(e.target.value))}
                    className="w-20 text-center border rounded-md"
                  />
                </div>
                <p className="text-gray-500 text-sm">Discount: {discount} THB</p>
  
                {/* Total Price */}
                <div className="mt-3 border-t pt-2">
                  <span className="font-bold">Total Price:</span> {totalPrice} THB
                </div>
  
                {/* ปุ่ม Cancel และ Buy */}
                <div className="flex justify-between mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default" className="bg-green-600">Buy</Button>
                </div>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
  
}
