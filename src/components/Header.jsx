import { useAppContext } from '../context/AppContext';
import { Button } from './shared';

export const Header = () => {
  const { role, setRole, currentPage, setCurrentPage } = useAppContext();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900">💰 Finance Dashboard</h1>
            <nav className="hidden md:flex gap-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('transactions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'transactions'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setCurrentPage('insights')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'insights'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Insights
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white cursor-pointer hover:border-gray-400"
              >
                <option value="admin">👤 Admin</option>
                <option value="viewer">👁️ Viewer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden flex gap-2 mt-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentPage === 'dashboard'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('transactions')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentPage === 'transactions'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setCurrentPage('insights')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentPage === 'insights'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Insights
          </button>
        </nav>
      </div>
    </header>
  );
};
