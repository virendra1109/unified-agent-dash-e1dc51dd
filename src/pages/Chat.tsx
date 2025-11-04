import { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import ChatMessage from '@/components/ChatMessage';
import QueryResultCard from '@/components/QueryResultCard';
import { apiClient, QueryResponse } from '@/lib/api';
import { storage } from '@/lib/storage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  result?: QueryResponse;
  processingTime?: number;
}

const EXAMPLE_QUERIES = [
  'Post a hello message in the general channel',
  'Fetch all HubSpot deals over $10,000',
  'List all files in the current directory',
  'Get all contacts from HubSpot and notify in Slack',
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    const steps = [
      '🤖 Analyzing query...',
      '🔍 Selecting servers...',
      '🛠️ Searching tools...',
      '⚡ Executing...',
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setProcessingStep(steps[stepIndex]);
        stepIndex++;
      }
    }, 800);

    try {
      const startTime = Date.now();
      const result = await apiClient.processQuery(query);
      const processingTime = (Date.now() - startTime) / 1000;

      clearInterval(stepInterval);
      setProcessingStep('');

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.result || result.error || 'Query completed',
        timestamp: Date.now(),
        result,
        processingTime,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Store in history
      storage.addQuery({
        id: Date.now().toString(),
        query: userMessage.content,
        timestamp: Date.now(),
        servers: result.plan.servers,
        tools: result.selected_tools,
        result: result.result,
        success: result.success,
      });

      if (result.success) {
        toast.success('Query executed successfully! ✨');
      } else {
        toast.error('Query failed');
      }
    } catch (error) {
      clearInterval(stepInterval);
      setProcessingStep('');

      toast.error('Failed to process query');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          Multi-MCP Agent Chat
        </h1>
        <p className="text-lg text-muted-foreground">
          Ask me to do anything across your connected services
        </p>
      </div>

      {/* Chat Container */}
      <Card className="min-h-[600px] flex flex-col shadow-elegant">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-foreground">
                  Start a conversation
                </p>
                <p className="text-sm text-muted-foreground">
                  Try one of these example queries:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {EXAMPLE_QUERIES.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example)}
                    className="group p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-gradient-primary hover:text-white transition-all duration-300 text-left"
                  >
                    <p className="text-sm font-medium">{example}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className="space-y-4">
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                  {message.result && (
                    <QueryResultCard
                      result={message.result}
                      processingTime={message.processingTime}
                    />
                  )}
                </div>
              ))}

              {/* Processing Indicator */}
              {loading && (
                <div className="flex items-center gap-3 text-primary animate-fade-in">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">{processingStep}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me to do anything across your connected services..."
              className="min-h-[60px] resize-none"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading || !query.trim()}
              className="bg-gradient-primary text-white border-none shadow-glow hover:scale-105 transition-all duration-200 px-8"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
