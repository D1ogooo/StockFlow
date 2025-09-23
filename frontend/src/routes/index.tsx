// import { useAuth } from '@/hooks/useAuth';
import { AuthRoutes } from './app.routes';
import { AdminRoutes } from './admin.routes';
import { BrowserRouter } from 'react-router-dom';

export function Router() {
//   const { user } = useAuth();
  const user = false
  let routes = null;

  if (!user) {
    routes = <AuthRoutes />;
  } else {
    routes = <AdminRoutes />;
  }

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}