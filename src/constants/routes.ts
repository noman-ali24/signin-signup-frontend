export const ROUTES = {
  SPLASH: 'Splash',
  SIGN_IN: 'SignIn',
  SIGN_UP_STEP_1: 'SignUpStep1',
  SIGN_UP_PHONE: 'SignUpPhone',
  SIGN_UP_PASSKEY: 'SignUpPasskey',
  SIGN_UP_TERMS: 'SignUpTerms',
  FORGOT_PASSWORD: 'ForgotPassword',
  HOME: 'Home',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];
