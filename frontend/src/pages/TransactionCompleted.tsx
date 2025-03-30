import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TransactionCompleted = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] text-center">
                <h2 className="text-lg font-semibold">
                    Your transaction has been completed
                </h2>
                <div className="mt-6">
                    <Button
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                        onClick={() => navigate("/marketplace")}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionCompleted;
