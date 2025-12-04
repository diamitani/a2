
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Music, 
  User, 
  Bot, 
  Settings, 
  Menu, 
  X, 
  Mic2,
  Bell, 
  Search 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const NavItem = ({ to, icon: Icon, label, isActive }: { to: string, icon: any, label: string, isActive: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium
      ${isActive 
        ? 'bg-brand-red text-white shadow-md' 
        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
      }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);

const SubNavItem = ({ to, label, isActive }: { to: string, label: string, isActive: boolean }) => (
  <Link
    to={to}
    className={`block ml-10 pl-4 border-l-2 py-2 text-sm transition-colors
      ${isActive
        ? 'border-brand-red text-brand-red font-semibold'
        : 'border-zinc-200 text-zinc-500 hover:text-zinc-900'
      }`}
  >
    {label}
  </Link>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isPublishing = location.pathname.startsWith('/publishing');
  const isDirectories = location.pathname.startsWith('/directories');

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden text-brand-black">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-zinc-200 transition-all duration-300 flex flex-col fixed md:relative z-20 h-full shadow-lg md:shadow-none`}
      >
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             {/* Logo Update: Using an image source. Replace src with your actual logo URL */}
            <img 
              src="https://placehold.co/100x100/09090b/facc15?text=A" 
              alt="Artispreneur Logo" 
              className="w-10 h-10 rounded object-contain" 
            />
            <span className="font-bold text-lg tracking-tight">Artispreneur</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-zinc-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" isActive={location.pathname === '/'} />
          <NavItem to="/academy" icon={GraduationCap} label="Academy" isActive={location.pathname === '/academy'} />
          
          {/* Expanded Publishing Hub */}
          <div>
            <NavItem to="/publishing/setup" icon={Music} label="Publishing Hub" isActive={isPublishing} />
            {isPublishing && (
              <div className="mt-1 mb-2 space-y-1 animate-fadeIn">
                <SubNavItem to="/publishing/setup" label="Setup" isActive={location.pathname === '/publishing/setup'} />
                <SubNavItem to="/publishing/catalog" label="Music Catalog" isActive={location.pathname === '/publishing/catalog'} />
                <SubNavItem to="/publishing/licensing" label="Licensing" isActive={location.pathname === '/publishing/licensing'} />
                <SubNavItem to="/publishing/documents" label="Documents" isActive={location.pathname === '/publishing/documents'} />
                <SubNavItem to="/publishing/optimizer" label="Optimizer" isActive={location.pathname === '/publishing/optimizer'} />
                <SubNavItem to="/publishing/business" label="Business & Tax" isActive={location.pathname === '/publishing/business'} />
              </div>
            )}
          </div>

          {/* Expanded Directories */}
          <div>
            <NavItem to="/directories" icon={BookOpen} label="Directories" isActive={isDirectories} />
            {isDirectories && (
              <div className="mt-1 mb-2 space-y-1 animate-fadeIn">
                <SubNavItem to="/directories/venues" label="Venue Directory" isActive={location.pathname === '/directories/venues'} />
              </div>
            )}
          </div>

          <NavItem to="/profile" icon={User} label="Artist Profile" isActive={location.pathname === '/profile'} />
          <NavItem to="/ai-tools" icon={Bot} label="AI Tools" isActive={location.pathname === '/ai-tools'} />
          <NavItem to="/settings" icon={Settings} label="Settings" isActive={location.pathname === '/settings'} />
        </nav>
        
        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden">
               <img src="https://picsum.photos/100/100" alt="User" />
            </div>
            <div>
              <p className="text-sm font-semibold">Alex Rivera</p>
              <p className="text-xs text-zinc-500">Pro Artist Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-zinc-500 hover:text-brand-black">
                <Menu size={24} />
              </button>
            )}
            <h1 className="text-xl font-bold text-brand-black">
              {isPublishing ? 'Music Publishing Hub' : isDirectories ? 'Directories' : 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-zinc-100 rounded-lg px-3 py-2 w-64">
              <Search size={18} className="text-zinc-400 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
            <button className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
