import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/contact(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // if it's a public route, do nothing
  auth().protect(); // for any other route, require auth
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
