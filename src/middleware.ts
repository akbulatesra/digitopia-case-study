import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['tr', 'en'],

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/((?!api|.*\\..*).*)'],
};
