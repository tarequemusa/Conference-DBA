export async function POST(req) {
  const data = await req.json();

  console.log("User Registered:", data);

  return Response.json({
    success: true,
  });
}
