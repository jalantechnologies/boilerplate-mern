import { Nullable } from '../../../types';
import { Account } from '../types';

export const serializeAccountAsJSON = (account: Nullable<Account>): unknown => ({
  id: account?.id,
  phoneNumber: account?.phoneNumber,
  firstName: account?.firstName,
  lastName: account?.lastName,
  username: account?.username,
});
