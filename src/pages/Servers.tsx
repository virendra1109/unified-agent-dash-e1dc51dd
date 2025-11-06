// import { useEffect, useState } from 'react';
// import { Server as ServerIcon, Plus } from 'lucide-react';
// import { toast } from 'sonner';
// import ServerCard from '@/components/ServerCard';
// import AddServerModal from '@/components/AddServerModal';
// import { apiClient, ServerInfo, MCPServerConfig } from '@/lib/api';
// import { Card } from '@/components/ui/card';

// export default function Servers() {
//   const [servers, setServers] = useState<ServerInfo[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchServers = async () => {
//     try {
//       setLoading(true);
//       const response = await apiClient.listServers();
//       setServers(response.servers);
//     } catch (error) {
//       toast.error('Failed to fetch servers');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServers();

//     // Auto-refresh every 30s
//     const interval = setInterval(fetchServers, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleAddServer = async (config: MCPServerConfig) => {
//     try {
//       await apiClient.addServer(config);
//       toast.success(`Server "${config.name}" added successfully! ✅`);
//       fetchServers();
//     } catch (error) {
//       toast.error(`Failed to add server: ${error instanceof Error ? error.message : 'Unknown error'}`);
//       throw error;
//     }
//   };

//   const handleDeleteServer = async (serverName: string) => {
//     try {
//       await apiClient.removeServer(serverName);
//       toast.success(`Server "${serverName}" removed successfully! 🗑️`);
//       fetchServers();
//     } catch (error) {
//       toast.error('Failed to remove server');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-7xl space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="space-y-1">
//           <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
//             <ServerIcon className="h-8 w-8 text-primary" />
//             MCP Server Registry
//           </h1>
//           <p className="text-lg text-muted-foreground">
//             Manage your Model Context Protocol servers
//           </p>
//         </div>
//         <AddServerModal onAdd={handleAddServer} />
//       </div>

//       {/* Server Count */}
//       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//         <span className="font-semibold text-foreground text-lg">{servers.length}</span>
//         <span>{servers.length === 1 ? 'server' : 'servers'} connected</span>
//       </div>

//       {/* Servers Grid */}
//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3].map((i) => (
//             <Card key={i} className="h-48 animate-pulse bg-muted" />
//           ))}
//         </div>
//       ) : servers.length === 0 ? (
//         <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4 shadow-elegant">
//           <div className="h-24 w-24 rounded-2xl bg-gradient-primary/10 flex items-center justify-center">
//             <ServerIcon className="h-12 w-12 text-primary" />
//           </div>
//           <div className="space-y-2">
//             <h3 className="text-xl font-semibold text-foreground">No servers yet</h3>
//             <p className="text-muted-foreground max-w-md">
//               Add your first MCP server to start orchestrating tools across multiple platforms.
//             </p>
//           </div>
//           <AddServerModal onAdd={handleAddServer} />
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {servers.map((server) => (
//             <ServerCard key={server.name} server={server} onDelete={handleDeleteServer} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Server as ServerIcon, Activity, Zap, Database, Search } from 'lucide-react';
import { toast } from 'sonner';
import ServerCard from '@/components/ServerCard';
import { apiClient, ServerInfo } from '@/lib/api';
import { Card } from '@/components/ui/card';
import WorkflowDiagram from '@/components/Workflowdiagram';

export default function Servers() {
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.listServers();
      setServers(response.servers);
    } catch (error) {
      toast.error('Failed to fetch servers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();

    // Auto-refresh every 30s
    const interval = setInterval(fetchServers, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
          <Activity className="h-8 w-8 text-primary" />
          Multi-MCP Agent System
        </h1>
        <p className="text-lg text-muted-foreground">
          Intelligent orchestration across multiple Model Context Protocol servers
        </p>
      </div>

      {/* Workflow Diagram Section */}
      <Card className="overflow-hidden border-2 shadow-elegant">
        <WorkflowDiagram />
      </Card>

      {/* Connected Servers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <ServerIcon className="h-6 w-6 text-primary" />
              Connected Servers
            </h2>
            <p className="text-sm text-muted-foreground">
              Currently active MCP servers in the system
            </p>
          </div>
          
          {/* Server Count Badge */}
          <div className="flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full shadow-glow">
            <span className="font-bold text-lg">{servers.length}</span>
            <span className="text-sm">{servers.length === 1 ? 'server' : 'servers'}</span>
          </div>
        </div>

        {/* Servers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted" />
            ))}
          </div>
        ) : servers.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4 shadow-elegant">
            <div className="h-24 w-24 rounded-2xl bg-gradient-primary/10 flex items-center justify-center">
              <ServerIcon className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">No servers connected</h3>
              <p className="text-muted-foreground max-w-md">
                The backend system should automatically connect to configured MCP servers.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {servers.map((server) => (
              <ServerCard 
                key={server.name} 
                server={server} 
              />
            ))}
          </div>
        )}
      </div>

      {/* System Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-elegant hover:shadow-glow transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">FAISS Indexes</p>
              <p className="text-2xl font-bold text-foreground">
                {servers.length * 2}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Server & Tool indexes built
          </p>
        </Card>

        <Card className="p-6 shadow-elegant hover:shadow-glow transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Tools</p>
              <p className="text-2xl font-bold text-foreground">
                {servers.reduce((sum, s) => sum + s.tools_count, 0)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Across all connected servers
          </p>
        </Card>

        <Card className="p-6 shadow-elegant hover:shadow-glow transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">System Status</p>
              <p className="text-2xl font-bold text-success">Active</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            All systems operational
          </p>
        </Card>
      </div>
    </div>
  );
}
