import { NextRequest, NextResponse } from "next/server";

export interface MyApiNextRequest extends NextRequest {
  userId: string;
}

export interface MyApiNextResponse extends NextResponse {
  userId: string;
}
