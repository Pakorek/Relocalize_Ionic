import { createContext, Dispatch, SetStateAction } from 'react';
import { ShopInput } from '../mutations/createContributionShopMutation';

const ShopContext = createContext<{ shops: ShopInput[], setShops: Dispatch<SetStateAction<ShopInput[]>> | undefined }>({
  shops: [],
  setShops: undefined,
});

export default ShopContext;
