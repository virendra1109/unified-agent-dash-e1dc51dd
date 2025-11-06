// src/pages/Agents.tsx - NEW FILE
import { useEffect, useState } from 'react';
import { Users, Plus, Trash2, Code, Database } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface AgentInfo {
  name: string;
  display_name: string;
  description: string;
  capabilities: string[];
  requires_mcp: boolean;
  mcp_server?: string;
  source: string;
}

export default function Agents() {
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    instructions: '',
    capabilities: '',
    requires_mcp: false,
    mcp_server: '',
  });

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/agents');
      const data = await response.json();
      setAgents(data.agents);
    } catch (error) {
      toast.error('Failed to fetch agents');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const capabilities = formData.capabilities.split(',').map(c => c.trim()).filter(Boolean);
      
      const response = await fetch('http://localhost:8000/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          display_name: formData.display_name,
          description: formData.description,
          instructions: formData.instructions,
          capabilities,
          requires_mcp: formData.requires_mcp,
          mcp_server: formData.requires_mcp ? formData.mcp_server : null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to add agent');
      }

      toast.success('Agent added successfully! ✅');
      setShowAddDialog(false);
      setFormData({
        name: '',
        display_name: '',
        description: '',
        instructions: '',
        capabilities: '',
        requires_mcp: false,
        mcp_server: '',
      });
      fetchAgents();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add agent');
    }
  };

  const handleDeleteAgent = async (agentName: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/agents/${agentName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to delete agent');
      }

      toast.success(`Agent "${agentName}" removed successfully! 🗑️`);
      fetchAgents();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove agent');
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-600" />
            Agent Registry
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your AI agents for Approach 2 (Magentic Multi-Agent)
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none shadow-glow hover:scale-105 transition-all duration-200">
              <Plus className="mr-2 h-5 w-5" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>
                Create a new agent for the Magentic multi-agent workflow
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddAgent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Agent ID *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., custom_agent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name *</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    placeholder="e.g., Custom Agent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What does this agent do?"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions *</Label>
                <Textarea
                  id="instructions"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="System instructions for the agent..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capabilities">Capabilities (comma-separated) *</Label>
                <Input
                  id="capabilities"
                  value={formData.capabilities}
                  onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
                  placeholder="e.g., search, analysis, reporting"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="requires_mcp"
                  checked={formData.requires_mcp}
                  onCheckedChange={(checked) => setFormData({ ...formData, requires_mcp: checked })}
                />
                <Label htmlFor="requires_mcp">Requires MCP Server</Label>
              </div>

              {formData.requires_mcp && (
                <div className="space-y-2">
                  <Label htmlFor="mcp_server">MCP Server Name *</Label>
                  <Input
                    id="mcp_server"
                    value={formData.mcp_server}
                    onChange={(e) => setFormData({ ...formData, mcp_server: e.target.value })}
                    placeholder="e.g., slack, hubspot"
                    required={formData.requires_mcp}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none shadow-glow hover:scale-105 transition-all duration-200"
              >
                Create Agent
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Agent Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground text-lg">{agents.length}</span>
        <span>{agents.length === 1 ? 'agent' : 'agents'} available</span>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 animate-pulse bg-muted" />
          ))}
        </div>
      ) : agents.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4 shadow-elegant">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-600/10 flex items-center justify-center">
            <Users className="h-12 w-12 text-purple-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">No agents yet</h3>
            <p className="text-muted-foreground max-w-md">
              Add your first agent to enable Magentic multi-agent collaboration.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card
              key={agent.name}
              className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-glow animate-fade-in"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-glow">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{agent.display_name}</CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {agent.source === 'code' ? (
                            <><Code className="h-3 w-3 mr-1" />Code</>
                          ) : (
                            <><Database className="h-3 w-3 mr-1" />Database</>
                          )}
                        </Badge>
                        {agent.requires_mcp && (
                          <Badge variant="secondary" className="text-xs">
                            MCP: {agent.mcp_server}
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Delete Button - only for database agents */}
                  {agent.source === 'database' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Agent</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove "{agent.display_name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteAgent(agent.name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {agent.description || 'No description available'}
                </p>

                {/* Capabilities */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Capabilities:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((capability) => (
                      <Badge
                        key={capability}
                        variant="secondary"
                        className="text-xs"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}