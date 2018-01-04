// me
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const signIn = me => ({
  type: SIGNIN,
  me
});
export const signOut = () => ({
  type: SIGNOUT
});
