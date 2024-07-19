import { itemResolvers } from "./itemResolvers";
import { userResolver } from "./userResolver";

export const rootResolvers = {
  ...userResolver,
  ...itemResolvers
};
