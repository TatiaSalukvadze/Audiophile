
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse} from 'next/server'

const isProtectedRoute = createRouteMatcher(["/:category/:product","/admin","/admin/dashboard","/admin/users"]); //addYourSpecificRoutesInHereInTheFormOfAnArrayElement

export default clerkMiddleware((auth, req) => {

  if (!auth().userId && isProtectedRoute(req)) {
  //  auth().protect();
  return NextResponse.redirect(new URL('/sign-in', req.url))
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
