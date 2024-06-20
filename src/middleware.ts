// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware({
//   publicRoutes: ["/home", "/"],
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse} from 'next/server'

const isProtectedRoute = createRouteMatcher(["/:category/:product"]); //addYourSpecificRoutesInHereInTheFormOfAnArrayElement

export default clerkMiddleware((auth, req) => {

  if (isProtectedRoute(req)) {
  //  auth().protect();
  return NextResponse.redirect(new URL('/sign-in', req.url))
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
