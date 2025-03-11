import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPrivateRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, request) => {
  try {
    if (isPrivateRoute(request)) {
      await auth.protect();
    }
  } catch (error) {
    console.error("Clerk middleware error:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

export const config = {
  matcher: [
    // Match all routes except static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
