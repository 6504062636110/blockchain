import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Product, useProducts } from "@/lib/hook";
import { PlusCircle, MinusCircle, ShoppingCart } from "lucide-react";

export default function Marketplace() {
    const { data: prods } = useProducts();

    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);
    const [carbonCredit, setCarbonCredit] = useState<number>(1);
    const [cart, setCart] = useState<Array<{ product: Product, quantity: number }>>([]);
    const [showCart, setShowCart] = useState<boolean>(false);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1); // Reset quantity
    };

    const addToCart = () => {
        if (!selectedProduct) return;

        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(
            item => item.product.Product_ID === selectedProduct.Product_ID
        );

        if (existingProductIndex >= 0) {
            // Update quantity if product already in cart
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += quantity;
            setCart(updatedCart);
        } else {
            // Add new product to cart
            setCart([...cart, { product: selectedProduct, quantity }]);
        }
    };

    const updateCartItemQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
    };

    const removeFromCart = (index: number) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    const calculateDiscount = (product: Product, qty: number) => {
        return Math.min(
            Math.floor(carbonCredit / 100),
            product.CreditPerUnit * 0.2 * qty
        );
    };

    const calculateItemTotal = (product: Product, qty: number) => {
        const discount = calculateDiscount(product, qty);
        return product.CreditPerUnit * qty - discount;
    };

    const cartTotal = cart.reduce((total, item) => {
        return total + calculateItemTotal(item.product, item.quantity);
    }, 0);

    const discount = selectedProduct
        ? Math.min(
            Math.floor(carbonCredit / 100),
            selectedProduct.CreditPerUnit * 0.2 * quantity
        )
        : 0;

    const totalPrice = selectedProduct
        ? selectedProduct.CreditPerUnit * quantity - discount
        : 0;

    return (
        <div className="min-h-screen p-10 flex flex-col justify-center items-center">
            {/* Cart Button */}
            <div className="fixed bottom-5 right-5">
                <Button
                    onClick={() => setShowCart(true)}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                    <ShoppingCart size={18} />
                    <span>Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                </Button>
            </div>

            {/* Products */}
            <div className="flex justify-center gap-6 flex-wrap">
                {(prods || []).map((product) => (
                    <Dialog key={product.Product_ID}>
                        <DialogTrigger asChild>
                            <div
                                className="cursor-pointer bg-white p-6 rounded-xl shadow-md w-56 hover:scale-105 transition"
                                onClick={() => handleSelectProduct(product)}
                            >
                                <h2 className="text-xl font-bold">
                                    {product.ProductName}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Price (THB)
                                </p>
                                <p className="text-lg font-bold">
                                    {product.CreditPerUnit}
                                </p>
                            </div>
                        </DialogTrigger>

                        {/* Product Details Modal */}
                        {selectedProduct && (
                            <DialogContent className="p-6">
                                <DialogTitle className="text-xl font-bold">
                                    Product Details
                                </DialogTitle>
                                <div className="mt-2 border-b pb-2">
                                    <p>
                                        <span className="font-bold">
                                            Product name:
                                        </span>{" "}
                                        {selectedProduct.ProductName}
                                    </p>
                                    <div className="flex items-center gap-3 my-2">
                                        <span className="font-bold">
                                            Quantity:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="p-1 h-8 w-8"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                <MinusCircle size={16} />
                                            </Button>
                                            <span className="w-8 text-center">{quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="p-1 h-8 w-8"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                <PlusCircle size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    <p>
                                        <span className="font-bold">
                                            Price (THB):
                                        </span>{" "}
                                        {selectedProduct.CreditPerUnit}
                                    </p>
                                </div>

                                {/* Carbon Credit */}
                                <div className="flex justify-between mt-3">
                                    <span className="font-bold">
                                        Carbon credit
                                    </span>
                                    <input
                                        type="number"
                                        value={carbonCredit}
                                        onChange={(e) =>
                                            setCarbonCredit(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-20 text-center border rounded-md"
                                    />
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Discount: {discount} THB
                                </p>

                                {/* Total Price */}
                                <div className="mt-3 border-t pt-2">
                                    <span className="font-bold">
                                        Total Price:
                                    </span>{" "}
                                    {totalPrice} THB
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-between mt-4">
                                    <Button variant="outline">Cancel</Button>
                                    <Button
                                        variant="default"
                                        className="bg-blue-600"
                                        onClick={() => {
                                            addToCart();
                                            setShowCart(true);
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </DialogContent>
                        )}
                    </Dialog>
                ))}
            </div>

            {/* Shopping Cart Modal */}
            <Dialog open={showCart} onOpenChange={setShowCart}>
                <DialogContent className="p-6 max-w-2xl">
                    <DialogTitle className="text-xl font-bold">Shopping Cart</DialogTitle>

                    {cart.length > 0 ? (
                        <div className="mt-4">
                            {/* Cart Items */}
                            <div className="max-h-96 overflow-y-auto">
                                {cart.map((item, index) => (
                                    <div key={index} className="border-b py-3 flex justify-between items-center">
                                        <div className="flex-1">
                                            <p className="font-bold">{item.product.ProductName}</p>
                                            <p className="text-sm">Price: {item.product.CreditPerUnit} THB</p>
                                            <p className="text-sm text-gray-500">
                                                Discount: {calculateDiscount(item.product, item.quantity)} THB
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="p-1 h-8 w-8"
                                                onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                                            >
                                                <MinusCircle size={16} />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="p-1 h-8 w-8"
                                                onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                                            >
                                                <PlusCircle size={16} />
                                            </Button>
                                        </div>

                                        {/* Total & Remove */}
                                        <div className="ml-4 flex flex-col items-end">
                                            <p className="font-bold">{calculateItemTotal(item.product, item.quantity)} THB</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 p-0 h-6 mt-1"
                                                onClick={() => removeFromCart(index)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Total */}
                            <div className="mt-4 pt-3 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">Total Amount:</span>
                                    <span className="text-lg font-bold">{cartTotal} THB</span>
                                </div>
                            </div>

                            {/* Checkout Buttons */}
                            <div className="flex justify-between mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCart(false)}
                                >
                                    Continue Shopping
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                        // Checkout logic would go here
                                        alert("Proceeding to checkout!");
                                        setCart([]);
                                        setShowCart(false);
                                    }}
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-gray-500 mb-4">Your cart is empty</p>
                            <Button
                                variant="outline"
                                onClick={() => setShowCart(false)}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}