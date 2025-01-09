import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

function CheckoutPage({ message }: { message: string }) {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);

  const isSuccess = message === "Success! Your order was completed.";

  console.log(message);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="mb-4">
          {isSuccess ? (
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 dark:text-green-400 animate-pulse" />
          ) : (
            <XCircle className="w-16 h-16 mx-auto text-red-500 dark:text-red-400 animate-pulse" />
          )}
        </div>
        <Loader2 className="w-8 h-8 mx-auto mb-4 text-primary animate-spin" />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {message}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          {isSuccess ? 'Obrigado pela sua compra!' : 'Lamentamos o inconveniente.'}
          <br />
          Estamos a redirecionar-te para a página inicial...
        </p>
        <div className="flex justify-center items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
