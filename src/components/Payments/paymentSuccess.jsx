// src/pages/PaymentSuccess.jsx

import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 dark:bg-green-900 text-center">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">✅ Payment Successful!</h1>
      <p className="mt-4 text-lg text-green-800 dark:text-green-100">
        Thank you for your payment. Your transaction ID is:
      </p>
      <p className="font-mono text-xl mt-2 bg-white dark:bg-black px-4 py-2 rounded shadow">
        {tranId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
