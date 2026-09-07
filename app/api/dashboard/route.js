import { NextResponse } from "next/server";
import dashboard from "../../../data/content.json";

export async function GET() {
  return NextResponse.json(dashboard);
}