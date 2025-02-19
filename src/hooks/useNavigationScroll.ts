import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../lib/utils/navigation';

export function useNavigationScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);
}