import { NextRequest, NextFetchEvent, userAgent } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);
  if (ua?.isBot) {
    return new Response("Plz don't be a bot. Be human.", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.has("carrotsession")) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
  //  return NextResponse.json({ ok: true });
  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("chats ONLY middleware");
  }
}