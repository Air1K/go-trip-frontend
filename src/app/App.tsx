import { RouterProvider } from 'react-router-dom';
import router from '@/routes/routes.tsx';
import { useCheckAuthQuery } from '@/api/user/hooks.ts';

function App() {
  const { isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
