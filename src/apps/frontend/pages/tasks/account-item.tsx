import React from 'react';

import { HorizontalStackLayout, Input, ParagraphSmall } from '../../components';
import { Account } from '../../types';

interface AccountItemProps {
  account: Account;
  handleToggle: (userId: string) => void;
  selected: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({ account, handleToggle, selected }) => {
  return (
    <HorizontalStackLayout gap={7}>
      <div>
        <Input
          error=""
          type="checkbox"
          checked={selected}
          onChange={() => handleToggle(account.id)}
        />
      </div>
      <ParagraphSmall>
        {account.displayName()} ({account.username})
      </ParagraphSmall>
    </HorizontalStackLayout>
  );
};

export default AccountItem;
