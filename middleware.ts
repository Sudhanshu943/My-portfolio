import { auth } from '@/lib/auth';

export default auth((req) => {
  // Add your middleware logic here if needed
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};