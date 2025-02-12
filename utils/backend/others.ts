import { NextResponse } from "next/server";

export function errorResponse(error: unknown) {
  console.log(error);
  return NextResponse.json(
    { error: true, details: error },
    {
      status: 400,
    }
  );
}
