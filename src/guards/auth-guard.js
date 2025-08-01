/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);


  useEffect(
    () => {
      window.sessionStorage.getItem('authenticated')
      if (!router.isReady) {
        return;
      }

      if (ignore.current) {
        return;
      }

      ignore.current = true;
      if (!isAuthenticated) {
      
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/auth/login' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
        }
          setChecked(true);
    },
    [router.isReady]
  );

  if (!checked) {
    return null;
  }


  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
