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

// refetch
export const REFETCH_INTERFACE = 'REFETCH_INTERFACE';
export const REFETCH_PRODUCTS = 'REFETCH_PRODUCTS';
export const refetchInterface = () => ({
  type: REFETCH_INTERFACE
});
export const refetchProducts = () => ({
  type: REFETCH_PRODUCTS
});

// category
export const NEW_CATEGORY = 'NEW_CATEGORY';
export const newCategory = category => ({
  type: NEW_CATEGORY,
  category
});
