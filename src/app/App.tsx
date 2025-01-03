import { RouterProvider } from 'react-router-dom';
import router from '@/routes/routes.tsx';
import { useCheckAuthQuery } from '@/api/user/hooks.ts';
import Loader from '@/components/Loader.tsx';

function App() {
  const { isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
