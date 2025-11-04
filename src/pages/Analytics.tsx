import { useEffect, useState } from 'react';
import { Server, Wrench, TrendingUp, Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/StatCard';
import { apiClient } from '@/lib/api';
import { storage, StoredQuery } from '@/lib/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FA57E3', '#7C3AED', '#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function Analytics() {
  const [serverCount, setServerCount] = useState(0);
  const [toolsCount, setToolsCount] = useState(0);
  const [queryHistory, setQueryHistory] = useState<StoredQuery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch servers
        const serversResponse = await apiClient.listServers();
        setServerCount(serversResponse.total_count);
        
        // Calculate total tools
        const total = serversResponse.servers.reduce((sum, s) => sum + s.tools_count, 0);
        setToolsCount(total);

        // Get query history
        const history = storage.getQueryHistory();
        setQueryHistory(history);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const queriesToday = storage.getQueriesToday();
  const successRate = storage.getSuccessRate();

  // Server usage distribution
  const serverUsage = queryHistory.reduce((acc, query) => {
    query.servers.forEach((server) => {
      acc[server] = (acc[server] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const serverUsageData = Object.entries(serverUsage).map(([name, value]) => ({
    name,
    value,
  }));

  // Tool usage frequency (top 10)
  const toolUsage = queryHistory.reduce((acc, query) => {
    Object.entries(query.tools).forEach(([server, tools]) => {
      tools.forEach((tool) => {
        const key = `${server}:${tool}`;
        acc[key] = (acc[key] || 0) + 1;
      });
    });
    return acc;
  }, {} as Record<string, number>);

  const toolUsageData = Object.entries(toolUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({
      name: name.split(':')[1],
      count,
    }));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
          <Activity className="h-8 w-8 text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Visualize your Multi-MCP Agent activity
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Servers"
          value={serverCount}
          icon={Server}
          description="Connected MCP servers"
        />
        <StatCard
          title="Available Tools"
          value={toolsCount}
          icon={Wrench}
          description="Across all servers"
        />
        <StatCard
          title="Queries Today"
          value={queriesToday}
          icon={TrendingUp}
          description="Processed in last 24h"
        />
        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
          icon={Activity}
          description={`From ${queryHistory.length} total queries`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Usage Distribution */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Server Usage Distribution</CardTitle>
            <CardDescription>Which servers are used most frequently</CardDescription>
          </CardHeader>
          <CardContent>
            {serverUsageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serverUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serverUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No usage data yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tool Usage Frequency */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Top Tools Usage</CardTitle>
            <CardDescription>Most frequently used tools</CardDescription>
          </CardHeader>
          <CardContent>
            {toolUsageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={toolUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FA57E3" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No tool usage data yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest query executions</CardDescription>
        </CardHeader>
        <CardContent>
          {queryHistory.length > 0 ? (
            <div className="space-y-4">
              {queryHistory.slice(0, 10).map((query) => (
                <div
                  key={query.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={query.success ? 'default' : 'destructive'}
                        className={query.success ? 'bg-success' : ''}
                      >
                        {query.success ? 'Success' : 'Failed'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(query.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="font-medium text-foreground">{query.query}</p>
                    <div className="flex flex-wrap gap-2">
                      {query.servers.map((server) => (
                        <Badge key={server} variant="outline">
                          {server}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
              <Clock className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No queries executed yet</p>
              <p className="text-sm text-muted-foreground">
                Start chatting to see your activity here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
