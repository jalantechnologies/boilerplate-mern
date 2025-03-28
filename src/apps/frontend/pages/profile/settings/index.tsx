import { HeadingLarge, VerticalStackLayout } from 'frontend/components';
import routes from 'frontend/constants/routes';
import { useAccountContext, useAuthContext } from 'frontend/contexts';
import AccountActionsSection from 'frontend/pages/profile/settings/account-actions-section';
import AccountDeletionModal from 'frontend/pages/profile/settings/account-deletion-modal';
import PersonalInfoSection from 'frontend/pages/profile/settings/personal-info-section';
import { AsyncError } from 'frontend/types';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const { accountDetails, deleteAccount, isDeleteAccountLoading } =
    useAccountContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate(routes.LOGIN);
  };

  const onAccountDeletionError = (err: AsyncError) => {
    toast.error(err.message);
  };

  const handleDeleteAccount = () => {
    deleteAccount()
      .then(() => {
        toast.success('Account deleted successfully');
        handleLogout();
      })
      .catch((err) => {
        onAccountDeletionError(err as AsyncError);
      });
  };

  const handleResetPasswordClick = () => {
    navigate(routes.FORGOT_PASSWORD);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <VerticalStackLayout gap={7}>
        <HeadingLarge>Settings</HeadingLarge>
        <div className="grid grid-cols-5 gap-8">
          <PersonalInfoSection accountDetails={accountDetails} />
          <AccountActionsSection
            accountDetails={accountDetails}
            setIsDeleteAccountModalOpen={setIsDeleteAccountModalOpen}
            handleLogout={handleLogout}
            handleResetPassword={handleResetPasswordClick}
          />
        </div>
        <AccountDeletionModal
          handleDeleteAccount={handleDeleteAccount}
          isModalOpen={isDeleteAccountModalOpen}
          setIsModalOpen={setIsDeleteAccountModalOpen}
          isDeleteAccountLoading={isDeleteAccountLoading}
        />
      </VerticalStackLayout>
    </div>
  );
};

export default ProfileSettings;
