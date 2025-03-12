import ProductCard from "../components/ui/ProductCard"; 


function Marketplace() {
  return (
    <div className="pt-20 text-center">
      <h1 className="text-3xl font-bold mb-6">MARKET PLACE</h1>
      <div className="flex justify-center gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default Marketplace;
