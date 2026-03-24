export async function POST(req) {
  const body = await req.json();

  console.log("Received:", body);

  return Response.json({
    success: true,
  });
}
