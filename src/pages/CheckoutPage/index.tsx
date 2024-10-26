function CheckoutPage({ message }: { message: string }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800 text-center">
          {message}
        </h1>
      </div>
    </div>
  );
}

export default CheckoutPage;
