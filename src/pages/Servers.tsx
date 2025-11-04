import { useEffect, useState } from 'react';
import { Server as ServerIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ServerCard from '@/components/ServerCard';
import AddServerModal from '@/components/AddServerModal';
import { apiClient, ServerInfo, MCPServerConfig } from '@/lib/api';
import { Card } from '@/components/ui/card';

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

  const handleAddServer = async (config: MCPServerConfig) => {
    try {
      await apiClient.addServer(config);
      toast.success(`Server "${config.name}" added successfully! ✅`);
      fetchServers();
    } catch (error) {
      toast.error(`Failed to add server: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  const handleDeleteServer = async (serverName: string) => {
    try {
      await apiClient.removeServer(serverName);
      toast.success(`Server "${serverName}" removed successfully! 🗑️`);
      fetchServers();
    } catch (error) {
      toast.error('Failed to remove server');
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <ServerIcon className="h-8 w-8 text-primary" />
            MCP Server Registry
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your Model Context Protocol servers
          </p>
        </div>
        <AddServerModal onAdd={handleAddServer} />
      </div>

      {/* Server Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground text-lg">{servers.length}</span>
        <span>{servers.length === 1 ? 'server' : 'servers'} connected</span>
      </div>

      {/* Servers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 animate-pulse bg-muted" />
          ))}
        </div>
      ) : servers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4 shadow-elegant">
          <div className="h-24 w-24 rounded-2xl bg-gradient-primary/10 flex items-center justify-center">
            <ServerIcon className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">No servers yet</h3>
            <p className="text-muted-foreground max-w-md">
              Add your first MCP server to start orchestrating tools across multiple platforms.
            </p>
          </div>
          <AddServerModal onAdd={handleAddServer} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <ServerCard key={server.name} server={server} onDelete={handleDeleteServer} />
          ))}
        </div>
      )}
    </div>
  );
}
