import SSLCommerzPayment from "sslcommerz-lts";

export async function POST() {
  const sslcz = new SSLCommerzPayment(
    "your_store_id",
    "your_store_pass",
    false,
  );

  const data = {
    total_amount: 500,
    currency: "BDT",
    tran_id: "REF123456",
    success_url: "http://localhost:3000/success",
    fail_url: "http://localhost:3000/fail",
    cancel_url: "http://localhost:3000/cancel",
    product_name: "Conference Fee",
    cus_name: "Test User",
    cus_email: "test@mail.com",
  };

  const apiResponse = await sslcz.init(data);

  return Response.json({
    url: apiResponse.GatewayPageURL,
  });
}
