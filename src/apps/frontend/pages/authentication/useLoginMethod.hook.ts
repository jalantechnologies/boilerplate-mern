import { useEffect } from 'react';

import constant from '../../constants';
import { useAuthContext } from '../../contexts';

export const useLoginMethod = () => {
  const { loginProps, setLoginProps } = useAuthContext();
  const { defaultMobileLogin, defaultWebLogin } = loginProps;

  useEffect(() => {
    const updateLoginMethod = () => {
      const isMobile = window.innerWidth <= constant.MOBILE_BREAKPOINT;
      const newLoginMethod = isMobile ? defaultMobileLogin : defaultWebLogin;

      setLoginProps((prev) => {
        if (prev.currentLoginMethod !== newLoginMethod) {
          return { ...prev, currentLoginMethod: newLoginMethod };
        }
        return prev;
      });
    };

    updateLoginMethod();
    window.addEventListener('resize', updateLoginMethod);

    return () => window.removeEventListener('resize', updateLoginMethod);
  }, [defaultMobileLogin, defaultWebLogin, setLoginProps]);

  return { loginProps };
};
