import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthRoutes } from './app.routes';
import { AdminRoutes } from './admin.routes';
import { BrowserRouter } from 'react-router-dom';

export function Router() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  let routes = null;

  if (!user) {
    routes = <AuthRoutes />;
  } else {
    routes = <AdminRoutes />;
  }


  useEffect(() => {
  const checkUser = () => {
   setLoading(false);
  };
   checkUser();
  }, []);

  if (loading) {
   return
  }

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}