"use client";

export default function Payment() {
  const handlePayment = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl mb-4">Conference Payment</h2>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay with SSLCommerz
      </button>
    </div>
  );
}
