import { router, usePathname } from 'expo-router';
import { useEffect } from 'react';

import { useAuthContext } from '@/contexts';

type ProtectedRouteComponentProps = {
  children: JSX.Element;
  requiredRole: string;
};

export function ProtectedRouteComponent({
  children,
  requiredRole,
}: ProtectedRouteComponentProps): JSX.Element | null {
  const pathname = usePathname();

  const { userData } = useAuthContext();

  useEffect(() => {
    if (
      userData &&
      userData.roleName !== requiredRole &&
      !pathname.includes('/blog')
    ) {
      router.push('/');
    }
  }, [userData, requiredRole, pathname]);

  const hasRequiredRole = userData && userData.roleName === requiredRole;

  if (!hasRequiredRole) {
    return null;
  }

  return children;
}
