import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightSidebar from './RightSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-6 overflow-y-auto flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <footer className="mt-8 py-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Copyright - Budget Tracker {currentYear} Designed by{' '}
                <a 
                  href="https://www.linkedin.com/in/shyamapadamondal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Shyama Pada Mondal
                </a>
              </p>
            </footer>
          </main>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;