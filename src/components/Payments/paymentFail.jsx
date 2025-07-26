import React from "react";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 dark:bg-red-900 text-center">
      <h1 className="text-3xl font-bold text-red-700 dark:text-red-300">❌ Payment Failed</h1>
      <p className="mt-4 text-lg text-red-800 dark:text-red-100">
        Unfortunately, your payment was not successful.
      </p>
      <p className="mt-2 text-red-600 dark:text-red-200">
        Please try again or contact support if the problem persists.
      </p>
    </div>
  );
};

export default PaymentFailed;
