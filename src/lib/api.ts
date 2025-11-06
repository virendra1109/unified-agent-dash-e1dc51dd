<<<<<<< HEAD
// // src/lib/api.ts
// // API Service Layer for Multi-MCP Agent with Dual Approaches
=======
// // API Service Layer for Multi-MCP Agent
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// export interface QueryRequest {
//   query: string;
// }

// export interface QueryResponse {
//   success: boolean;
//   query: string;
<<<<<<< HEAD
//   approach?: number;
//   plan?: {
//     servers?: string[];
//     agents?: string[];
//     tool_queries: Record<string, string>;
//   };
//   selected_tools?: Record<string, string[]>;
//   agents_used?: string[];
=======
//   plan: {
//     servers: string[];
//     tool_queries: Record<string, string>;
//   };
//   selected_tools: Record<string, string[]>;
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
//   result?: string;
//   error?: string;
// }

// export interface MCPServerConfig {
//   name: string;
//   type: 'stdio' | 'http';
//   command?: string;
//   args?: string[];
//   url?: string;
//   env?: Record<string, string>;
//   description?: string;
// }

// export interface ServerInfo {
//   name: string;
//   type: string;
//   description?: string;
//   tools_count: number;
//   status: string;
// }

// export interface ListServersResponse {
//   success: boolean;
//   servers: ServerInfo[];
//   total_count: number;
// }

// export interface AddServerResponse {
//   success: boolean;
//   message: string;
//   server_name: string;
// }

// export interface HealthResponse {
//   status: string;
<<<<<<< HEAD
//   approach1_initialized: boolean;
//   approach2_initialized: boolean;
//   approach1_servers: number;
//   approach2_agents: number;
// }

// export interface ApproachInfo {
//   id: number;
//   name: string;
//   description: string;
//   features: string[];
//   available: boolean;
//   servers?: string[];
//   agents?: string[];
// }

// export interface ApproachesResponse {
//   approaches: ApproachInfo[];
=======
//   agent_initialized: boolean;
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
// }

// class APIClient {
//   private baseURL: string;

//   constructor(baseURL: string) {
//     this.baseURL = baseURL;
//   }

<<<<<<< HEAD
//   // Unified query endpoint with approach selection
//   async processQueryWithApproach(query: string, approach: number): Promise<QueryResponse> {
//     const response = await fetch(`${this.baseURL}/api/query/unified`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query, approach }),
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ detail: response.statusText }));
//       throw new Error(error.detail || `Query failed: ${response.statusText}`);
=======
//   async processQuery(query: string): Promise<QueryResponse> {
//     const response = await fetch(`${this.baseURL}/api/query`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query }),
//     });

//     if (!response.ok) {
//       throw new Error(`Query failed: ${response.statusText}`);
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
//     }

//     return response.json();
//   }

<<<<<<< HEAD
//   // Legacy approach 1 endpoint (for backward compatibility)
//   async processQuery(query: string): Promise<QueryResponse> {
//     return this.processQueryWithApproach(query, 1);
//   }

//   // Get available approaches
//   async getApproaches(): Promise<ApproachesResponse> {
//     const response = await fetch(`${this.baseURL}/api/approaches`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch approaches: ${response.statusText}`);
//     }

//     return response.json();
//   }

//   // Server management (Approach 1)
=======
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
//   async listServers(): Promise<ListServersResponse> {
//     const response = await fetch(`${this.baseURL}/api/registry/servers`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch servers: ${response.statusText}`);
//     }

//     return response.json();
//   }

//   async addServer(serverConfig: MCPServerConfig): Promise<AddServerResponse> {
//     const response = await fetch(`${this.baseURL}/api/registry/servers`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ server_config: serverConfig }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.detail || 'Failed to add server');
//     }

//     return response.json();
//   }

//   async removeServer(serverName: string): Promise<{ success: boolean; message: string }> {
//     const response = await fetch(`${this.baseURL}/api/registry/servers`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ server_name: serverName }),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to remove server: ${response.statusText}`);
//     }

//     return response.json();
//   }

<<<<<<< HEAD
//   // Health check
=======
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
//   async checkHealth(): Promise<HealthResponse> {
//     const response = await fetch(`${this.baseURL}/health`);

//     if (!response.ok) {
//       throw new Error('Health check failed');
//     }

//     return response.json();
//   }
// }

// export const apiClient = new APIClient(API_BASE_URL);

<<<<<<< HEAD

// src/lib/api.ts
// API Service Layer for Multi-MCP Agent with Dual Approaches
=======
// API Service Layer for Multi-MCP Agent
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface QueryRequest {
  query: string;
  session_id?: string;
}

export interface QueryResponse {
  success: boolean;
  query: string;
  approach?: number;
  plan?: {
    servers?: string[];
    agents?: string[];
    tool_queries: Record<string, string>;
  };
  selected_tools?: Record<string, string[]>;
  agents_used?: string[];
  result?: string;
  error?: string;
  session_id?: string;
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
  approach1_initialized: boolean;
  approach2_initialized: boolean;
  approach1_servers: number;
  approach2_agents: number;
}

export interface ApproachInfo {
  id: number;
  name: string;
  description: string;
  features: string[];
  available: boolean;
  servers?: string[];
  agents?: string[];
}

export interface ApproachesResponse {
  approaches: ApproachInfo[];
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

<<<<<<< HEAD
  // Unified query endpoint with approach selection
  async processQueryWithApproach(query: string, approach: number): Promise<QueryResponse> {
    const response = await fetch(`${this.baseURL}/api/query/unified`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, approach }),
=======
  async processQuery(query: string, session_id?: string): Promise<QueryResponse> {
    const response = await fetch(`${this.baseURL}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, session_id }),
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || `Query failed: ${response.statusText}`);
    }

    return response.json();
  }

<<<<<<< HEAD
  // Legacy approach 1 endpoint (for backward compatibility)
  async processQuery(query: string): Promise<QueryResponse> {
    return this.processQueryWithApproach(query, 1);
  }

  // Get available approaches
  async getApproaches(): Promise<ApproachesResponse> {
    const response = await fetch(`${this.baseURL}/api/approaches`);

    if (!response.ok) {
      throw new Error(`Failed to fetch approaches: ${response.statusText}`);
=======
  async clearSession(session_id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseURL}/api/clear-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to clear session: ${response.statusText}`);
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
    }

    return response.json();
  }

<<<<<<< HEAD
  // Server management (Approach 1)
=======
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
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

  // Health check
  async checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseURL}/health`);

    if (!response.ok) {
      throw new Error('Health check failed');
    }

    return response.json();
  }
}

export const apiClient = new APIClient(API_BASE_URL);