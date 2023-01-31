import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("middleware");
  if (req.nextUrl.pathname.startsWith("/chats")) {
      console.log("chats ONLY middleware");
  }
}