import { Button, LabelLarge } from 'frontend/components';
import { Account } from 'frontend/types';
import { ButtonKind, ButtonSize } from 'frontend/types/button';
import React from 'react';

interface AccountActionsSectionProps {
  accountDetails: Account;
  handleLogout: () => void;
  handleResetPassword: () => void;
  setIsDeleteAccountModalOpen: (isOpen: boolean) => void;
}

const AccountActionsSection: React.FC<AccountActionsSectionProps> = ({
  accountDetails,
  handleLogout,
  handleResetPassword,
  setIsDeleteAccountModalOpen,
}) => (
  <div className="col-span-5 xl:col-span-2">
    <div className="flex flex-col gap-4 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <LabelLarge>Account Actions</LabelLarge>
      <Button onClick={handleLogout} size={ButtonSize.LARGE}>
        Log Out
      </Button>
      {accountDetails.username && (
        <Button onClick={handleResetPassword} size={ButtonSize.LARGE}>
          Reset Password
        </Button>
      )}
      <Button
        onClick={() => setIsDeleteAccountModalOpen(true)}
        size={ButtonSize.LARGE}
        kind={ButtonKind.DANGER}
      >
        Delete Account
      </Button>
    </div>
  </div>
);

export default AccountActionsSection;
