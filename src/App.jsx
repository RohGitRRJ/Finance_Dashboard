import { MainLayout } from './components/MainLayout';
import { Dashboard, Transactions, Insights } from './pages';
import { useAppContext } from './context/AppContext';

function AppContent() {
  const { currentPage } = useAppContext();

  return (
    <MainLayout>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'transactions' && <Transactions />}
      {currentPage === 'insights' && <Insights />}
    </MainLayout>
  );
}

export default AppContent;
