// // import { useState, useEffect } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { MessageSquare, Server, Settings, Menu, X, Activity } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { apiClient } from '@/lib/api';
// // import { cn } from '@/lib/utils';

// // interface LayoutProps {
// //   children: React.ReactNode;
// // }

// // export default function Layout({ children }: LayoutProps) {
// //   const location = useLocation();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [healthStatus, setHealthStatus] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');
// //   const [agentInitialized, setAgentInitialized] = useState(false);

// //   useEffect(() => {
// //     const checkHealth = async () => {
// //       try {
// //         const health = await apiClient.checkHealth();
// //         setHealthStatus(health.status === 'healthy' ? 'healthy' : 'unhealthy');
// //         setAgentInitialized(health.agent_initialized);
// //       } catch {
// //         setHealthStatus('unhealthy');
// //       }
// //     };

// //     checkHealth();
// //     const interval = setInterval(checkHealth, 30000); // Check every 30s

// //     return () => clearInterval(interval);
// //   }, []);

// //   const navItems = [
// //     { icon: MessageSquare, label: 'Chat', path: '/' },
// //     { icon: Server, label: 'Servers', path: '/servers' },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-background">
// //       {/* Sidebar */}
// //       <aside
// //         className={cn(
// //           'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border',
// //           sidebarOpen ? 'w-64' : 'w-0 md:w-20'
// //         )}
// //       >
// //         <div className="flex h-full flex-col">
// //           {/* Logo */}
// //           <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
// //             {sidebarOpen && (
// //               <Link to="/" className="flex items-center gap-3">
// //                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
// //                   <Activity className="h-6 w-6 text-white" />
// //                 </div>
// //                 <div className="flex flex-col">
// //                   <span className="text-lg font-bold text-sidebar-foreground">Multi-MCP</span>
// //                   <span className="text-xs text-sidebar-foreground/60">Agent System</span>
// //                 </div>
// //               </Link>
// //             )}
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="text-sidebar-foreground hover:bg-sidebar-accent"
// //             >
// //               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
// //             </Button>
// //           </div>

// //           {/* Navigation */}
// //           <nav className="flex-1 space-y-2 p-4">
// //             {navItems.map((item) => {
// //               const isActive = location.pathname === item.path;
// //               const Icon = item.icon;

// //               return (
// //                 <Link key={item.path} to={item.path}>
// //                   <div
// //                     className={cn(
// //                       'flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200',
// //                       isActive
// //                         ? 'bg-gradient-primary text-white shadow-glow'
// //                         : 'text-sidebar-foreground hover:bg-sidebar-accent hover:scale-[1.02]'
// //                     )}
// //                   >
// //                     <Icon className="h-5 w-5 flex-shrink-0" />
// //                     {sidebarOpen && <span className="font-medium">{item.label}</span>}
// //                   </div>
// //                 </Link>
// //               );
// //             })}
// //           </nav>

// //           {/* Settings */}
// //           <div className="border-t border-sidebar-border p-4">
// //             <Button
// //               variant="ghost"
// //               className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
// //             >
// //               <Settings className="h-5 w-5" />
// //               {sidebarOpen && <span>Settings</span>}
// //             </Button>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <div
// //         className={cn(
// //           'flex-1 transition-all duration-300',
// //           sidebarOpen ? 'md:ml-64' : 'md:ml-20'
// //         )}
// //       >
// //         {/* Top Bar */}
// //         <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
// //           <div className="flex items-center gap-4">
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="md:hidden"
// //             >
// //               <Menu className="h-5 w-5" />
// //             </Button>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             {/* Health Status */}
// //             <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
// //               <div
// //                 className={cn(
// //                   'h-2 w-2 rounded-full',
// //                   healthStatus === 'healthy' && 'bg-success animate-pulse',
// //                   healthStatus === 'unhealthy' && 'bg-destructive',
// //                   healthStatus === 'checking' && 'bg-warning animate-pulse'
// //                 )}
// //               />
// //               <span className="text-sm font-medium text-muted-foreground">
// //                 {agentInitialized ? 'Agent Ready' : 'Initializing...'}
// //               </span>
// //             </div>

// //             {/* User Avatar Placeholder */}
// //             <div className="h-10 w-10 rounded-full bg-gradient-primary" />
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="p-6">{children}</main>
// //       </div>
// //     </div>
// //   );
// // }


// // src/components/Layout.tsx
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { MessageSquare, Server, Settings, Menu, X, Activity } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { apiClient } from '@/lib/api';
// import { cn } from '@/lib/utils';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [healthStatus, setHealthStatus] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');
//   const [approach1Ready, setApproach1Ready] = useState(false);
//   const [approach2Ready, setApproach2Ready] = useState(false);
//   const [serversCount, setServersCount] = useState(0);
//   const [agentsCount, setAgentsCount] = useState(0);

//   useEffect(() => {
//     const checkHealth = async () => {
//       try {
//         const health = await apiClient.checkHealth();
//         setHealthStatus(health.status === 'healthy' ? 'healthy' : 'unhealthy');
//         setApproach1Ready(health.approach1_initialized);
//         setApproach2Ready(health.approach2_initialized);
//         setServersCount(health.approach1_servers);
//         setAgentsCount(health.approach2_agents);
//       } catch {
//         setHealthStatus('unhealthy');
//       }
//     };

//     checkHealth();
//     const interval = setInterval(checkHealth, 30000); // Check every 30s

//     return () => clearInterval(interval);
//   }, []);

//   const navItems = [
//     { icon: MessageSquare, label: 'Chat', path: '/' },
//     { icon: Server, label: 'Servers', path: '/servers' },
//   ];

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* Sidebar */}
//       <aside
//         className={cn(
//           'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border',
//           sidebarOpen ? 'w-64' : 'w-0 md:w-20'
//         )}
//       >
//         <div className="flex h-full flex-col">
//           {/* Logo */}
//           <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
//             {sidebarOpen && (
//               <Link to="/" className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
//                   <Activity className="h-6 w-6 text-white" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-lg font-bold text-sidebar-foreground">Multi-MCP</span>
//                   <span className="text-xs text-sidebar-foreground/60">Agent System</span>
//                 </div>
//               </Link>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-sidebar-foreground hover:bg-sidebar-accent"
//             >
//               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 space-y-2 p-4">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               const Icon = item.icon;

//               return (
//                 <Link key={item.path} to={item.path}>
//                   <div
//                     className={cn(
//                       'flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200',
//                       isActive
//                         ? 'bg-gradient-primary text-white shadow-glow'
//                         : 'text-sidebar-foreground hover:bg-sidebar-accent hover:scale-[1.02]'
//                     )}
//                   >
//                     <Icon className="h-5 w-5 flex-shrink-0" />
//                     {sidebarOpen && <span className="font-medium">{item.label}</span>}
//                   </div>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Settings */}
//           <div className="border-t border-sidebar-border p-4">
//             <Button
//               variant="ghost"
//               className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
//             >
//               <Settings className="h-5 w-5" />
//               {sidebarOpen && <span>Settings</span>}
//             </Button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div
//         className={cn(
//           'flex-1 transition-all duration-300',
//           sidebarOpen ? 'md:ml-64' : 'md:ml-20'
//         )}
//       >
//         {/* Top Bar */}
//         <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="md:hidden"
//             >
//               <Menu className="h-5 w-5" />
//             </Button>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Approach Status Indicators */}
//             <TooltipProvider>
//               <div className="flex items-center gap-2">
//                 {/* Approach 1 Status */}
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <div className={cn(
//                       'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
//                       approach1Ready 
//                         ? 'bg-success/10 text-success border border-success/20' 
//                         : 'bg-muted text-muted-foreground'
//                     )}>
//                       <div
//                         className={cn(
//                           'h-1.5 w-1.5 rounded-full',
//                           approach1Ready && 'bg-success animate-pulse'
//                         )}
//                       />
//                       <span>A1</span>
//                       {approach1Ready && sidebarOpen && (
//                         <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
//                           {serversCount}
//                         </Badge>
//                       )}
//                     </div>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p className="font-semibold">Approach 1: Direct Orchestration</p>
//                     <p className="text-xs text-muted-foreground">
//                       {approach1Ready 
//                         ? `Ready • ${serversCount} servers` 
//                         : 'Not initialized'}
//                     </p>
//                   </TooltipContent>
//                 </Tooltip>

//                 {/* Approach 2 Status */}
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <div className={cn(
//                       'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
//                       approach2Ready 
//                         ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
//                         : 'bg-muted text-muted-foreground'
//                     )}>
//                       <div
//                         className={cn(
//                           'h-1.5 w-1.5 rounded-full',
//                           approach2Ready && 'bg-purple-600 animate-pulse'
//                         )}
//                       />
//                       <span>A2</span>
//                       {approach2Ready && sidebarOpen && (
//                         <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
//                           {agentsCount}
//                         </Badge>
//                       )}
//                     </div>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p className="font-semibold">Approach 2: Magentic Multi-Agent</p>
//                     <p className="text-xs text-muted-foreground">
//                       {approach2Ready 
//                         ? `Ready • ${agentsCount} agents` 
//                         : 'Not initialized'}
//                     </p>
//                   </TooltipContent>
//                 </Tooltip>
//               </div>
//             </TooltipProvider>

//             {/* Overall Health Status */}
//             <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
//               <div
//                 className={cn(
//                   'h-2 w-2 rounded-full',
//                   healthStatus === 'healthy' && 'bg-success animate-pulse',
//                   healthStatus === 'unhealthy' && 'bg-destructive',
//                   healthStatus === 'checking' && 'bg-warning animate-pulse'
//                 )}
//               />
//               <span className="text-sm font-medium text-muted-foreground">
//                 {healthStatus === 'healthy' && 'System Ready'}
//                 {healthStatus === 'unhealthy' && 'System Error'}
//                 {healthStatus === 'checking' && 'Checking...'}
//               </span>
//             </div>

//             {/* User Avatar Placeholder */}
//             <div className="h-10 w-10 rounded-full bg-gradient-primary" />
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }


// src/components/Layout.tsx - UPDATED with Agents navigation
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Server, Users, Settings, Menu, X, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');
  const [approach1Ready, setApproach1Ready] = useState(false);
  const [approach2Ready, setApproach2Ready] = useState(false);
  const [serversCount, setServersCount] = useState(0);
  const [agentsCount, setAgentsCount] = useState(0);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await apiClient.checkHealth();
        setHealthStatus(health.status === 'healthy' ? 'healthy' : 'unhealthy');
        setApproach1Ready(health.approach1_initialized);
        setApproach2Ready(health.approach2_initialized);
        setServersCount(health.approach1_servers);
        setAgentsCount(health.approach2_agents);
      } catch {
        setHealthStatus('unhealthy');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { icon: MessageSquare, label: 'Chat', path: '/' },
    { icon: Server, label: 'Servers', path: '/servers', badge: serversCount, color: 'blue' },
    { icon: Users, label: 'Agents', path: '/agents', badge: agentsCount, color: 'purple' },  // NEW
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
                      'flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-all duration-200',
                      isActive
                        ? 'bg-gradient-primary text-white shadow-glow'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:scale-[1.02]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    </div>
                    {sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs",
                          isActive && "bg-white/20 text-white"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
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
            {/* Approach Status Indicators */}
            <TooltipProvider>
              <div className="flex items-center gap-2">
                {/* Approach 1 Status */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                      approach1Ready 
                        ? 'bg-success/10 text-success border border-success/20' 
                        : 'bg-muted text-muted-foreground'
                    )}>
                      <div
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          approach1Ready && 'bg-success animate-pulse'
                        )}
                      />
                      <span>A1</span>
                      {approach1Ready && sidebarOpen && (
                        <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                          {serversCount}
                        </Badge>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Approach 1: Direct Orchestration</p>
                    <p className="text-xs text-muted-foreground">
                      {approach1Ready 
                        ? `Ready • ${serversCount} servers` 
                        : 'Not initialized'}
                    </p>
                  </TooltipContent>
                </Tooltip>

                {/* Approach 2 Status */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                      approach2Ready 
                        ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
                        : 'bg-muted text-muted-foreground'
                    )}>
                      <div
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          approach2Ready && 'bg-purple-600 animate-pulse'
                        )}
                      />
                      <span>A2</span>
                      {approach2Ready && sidebarOpen && (
                        <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                          {agentsCount}
                        </Badge>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Approach 2: Magentic Multi-Agent</p>
                    <p className="text-xs text-muted-foreground">
                      {approach2Ready 
                        ? `Ready • ${agentsCount} agents` 
                        : 'Not initialized'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {/* Overall Health Status */}
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
                {healthStatus === 'healthy' && 'System Ready'}
                {healthStatus === 'unhealthy' && 'System Error'}
                {healthStatus === 'checking' && 'Checking...'}
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