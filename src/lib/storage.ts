// Local Storage utilities for persisting query history

export interface StoredQuery {
  id: string;
  query: string;
  timestamp: number;
  servers: string[];
  tools: Record<string, string[]>;
  result?: string;
  success: boolean;
}

const QUERY_HISTORY_KEY = 'mcp_query_history';
const MAX_HISTORY_SIZE = 50;

export const storage = {
  getQueryHistory(): StoredQuery[] {
    try {
      const stored = localStorage.getItem(QUERY_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addQuery(query: StoredQuery): void {
    const history = this.getQueryHistory();
    history.unshift(query);
    
    // Keep only last MAX_HISTORY_SIZE queries
    const trimmed = history.slice(0, MAX_HISTORY_SIZE);
    
    localStorage.setItem(QUERY_HISTORY_KEY, JSON.stringify(trimmed));
  },

  clearHistory(): void {
    localStorage.removeItem(QUERY_HISTORY_KEY);
  },

  getQueriesCount(): number {
    return this.getQueryHistory().length;
  },

  getSuccessRate(): number {
    const history = this.getQueryHistory();
    if (history.length === 0) return 0;
    
    const successful = history.filter(q => q.success).length;
    return Math.round((successful / history.length) * 100);
  },

  getQueriesToday(): number {
    const today = new Date().setHours(0, 0, 0, 0);
    const history = this.getQueryHistory();
    
    return history.filter(q => q.timestamp >= today).length;
  },
};

