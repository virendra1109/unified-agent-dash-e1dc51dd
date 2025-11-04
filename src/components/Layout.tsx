import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Server, Settings, Menu, X, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');
  const [agentInitialized, setAgentInitialized] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await apiClient.checkHealth();
        setHealthStatus(health.status === 'healthy' ? 'healthy' : 'unhealthy');
        setAgentInitialized(health.agent_initialized);
      } catch {
        setHealthStatus('unhealthy');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { icon: MessageSquare, label: 'Chat', path: '/' },
    { icon: Server, label: 'Servers', path: '/servers' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border',
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            {sidebarOpen && (
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-sidebar-foreground">Multi-MCP</span>
                  <span className="text-xs text-sidebar-foreground/60">Agent System</span>
                </div>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200',
                      isActive
                        ? 'bg-gradient-primary text-white shadow-glow'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:scale-[1.02]'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Settings className="h-5 w-5" />
              {sidebarOpen && <span>Settings</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'md:ml-64' : 'md:ml-20'
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* Health Status */}
            <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  healthStatus === 'healthy' && 'bg-success animate-pulse',
                  healthStatus === 'unhealthy' && 'bg-destructive',
                  healthStatus === 'checking' && 'bg-warning animate-pulse'
                )}
              />
              <span className="text-sm font-medium text-muted-foreground">
                {agentInitialized ? 'Agent Ready' : 'Initializing...'}
              </span>
            </div>

            {/* User Avatar Placeholder */}
            <div className="h-10 w-10 rounded-full bg-gradient-primary" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
