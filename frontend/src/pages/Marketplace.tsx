import ProductCard from "../components/ui/ProductCard"; 


function Marketplace() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* ✅ กึ่งกลางจอ */}
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          MARKET PLACE
        </h1>

        {/* ✅ ใช้ `grid` ที่อยู่กึ่งกลางจอจริง ๆ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

export default Marketplace;