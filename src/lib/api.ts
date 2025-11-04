// API Service Layer for Multi-MCP Agent

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface QueryRequest {
  query: string;
}

export interface QueryResponse {
  success: boolean;
  query: string;
  plan: {
    servers: string[];
    tool_queries: Record<string, string>;
  };
  selected_tools: Record<string, string[]>;
  result?: string;
  error?: string;
}

export interface MCPServerConfig {
  name: string;
  type: 'stdio' | 'http';
  command?: string;
  args?: string[];
  url?: string;
  env?: Record<string, string>;
  description?: string;
}

export interface ServerInfo {
  name: string;
  type: string;
  description?: string;
  tools_count: number;
  status: string;
}

export interface ListServersResponse {
  success: boolean;
  servers: ServerInfo[];
  total_count: number;
}

export interface AddServerResponse {
  success: boolean;
  message: string;
  server_name: string;
}

export interface HealthResponse {
  status: string;
  agent_initialized: boolean;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async processQuery(query: string): Promise<QueryResponse> {
    const response = await fetch(`${this.baseURL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Query failed: ${response.statusText}`);
    }

    return response.json();
  }

  async listServers(): Promise<ListServersResponse> {
    const response = await fetch(`${this.baseURL}/api/registry/servers`);

    if (!response.ok) {
      throw new Error(`Failed to fetch servers: ${response.statusText}`);
    }

    return response.json();
  }

  async addServer(serverConfig: MCPServerConfig): Promise<AddServerResponse> {
    const response = await fetch(`${this.baseURL}/api/registry/servers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ server_config: serverConfig }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to add server');
    }

    return response.json();
  }

  async removeServer(serverName: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseURL}/api/registry/servers`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ server_name: serverName }),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove server: ${response.statusText}`);
    }

    return response.json();
  }

  async checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseURL}/health`);

    if (!response.ok) {
      throw new Error('Health check failed');
    }

    return response.json();
  }
}

export const apiClient = new APIClient(API_BASE_URL);
