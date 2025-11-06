// src/pages/Chat.tsx
import { useState } from 'react';
import { Send, Sparkles, Loader2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import ChatMessage from '@/components/ChatMessage';
import QueryResultCard from '@/components/QueryResultCard';
import ApproachSelector from '@/components/ApproachSelector';
import { apiClient, QueryResponse } from '@/lib/api';
import { storage } from '@/lib/storage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  result?: QueryResponse;
  processingTime?: number;
  approach?: number;
}

const EXAMPLE_QUERIES = {
  1: [
    'List all HubSpot contacts',
    'Post a message in Slack general channel',
    'Search for deals in HubSpot',
    'Get filesystem information',
  ],
  2: [
    'Get contacts from HubSpot and notify the team in Slack',
    'Fetch top deals from HubSpot and create a summary report',
    'Find recent HubSpot contacts and send welcome messages',
    'Analyze CRM data and post insights to Slack',
  ]
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [selectedApproach, setSelectedApproach] = useState<number>(1);
  const [showApproachSelector, setShowApproachSelector] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: Date.now(),
      approach: selectedApproach,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    const steps = selectedApproach === 1 
      ? [
          '🔍 Analyzing query...',
          '🎯 Selecting servers...',
          '🛠️ Filtering tools...',
          '⚡ Executing...',
        ]
      : [
          '🤖 Analyzing query...',
          '👥 Selecting agents...',
          '🔗 Building workflow...',
          '🚀 Orchestrating...',
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
      const result = await apiClient.processQueryWithApproach(query, selectedApproach);
      const processingTime = (Date.now() - startTime) / 1000;

      clearInterval(stepInterval);
      setProcessingStep('');

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.result || result.error || 'Query completed',
        timestamp: Date.now(),
        result,
        processingTime,
        approach: selectedApproach,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Store in history
      storage.addQuery({
        id: Date.now().toString(),
        query: userMessage.content,
        timestamp: Date.now(),
        servers: result.plan?.servers || [],
        tools: result.selected_tools || {},
        result: result.result,
        success: result.success,
      });

      if (result.success) {
        toast.success(`Query executed successfully using Approach ${selectedApproach}! ✨`);
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
          approach: selectedApproach,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  const getApproachBadge = () => {
    const config = {
      1: { label: 'Approach 1: Direct', color: 'from-blue-500 to-purple-600' },
      2: { label: 'Approach 2: Magentic', color: 'from-purple-500 to-pink-600' },
    };
    const current = config[selectedApproach as keyof typeof config];
    
    return (
      <Badge className={`bg-gradient-to-r ${current.color} text-white border-none shadow-glow`}>
        {current.label}
      </Badge>
    );
  };

  const currentExamples = EXAMPLE_QUERIES[selectedApproach as keyof typeof EXAMPLE_QUERIES] || EXAMPLE_QUERIES[1];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1 space-y-2">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Multi-MCP Agent Chat
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg text-muted-foreground">
              Ask me to do anything across your connected services
            </p>
            {getApproachBadge()}
          </div>
        </div>

        {/* Approach Settings */}
        <Dialog open={showApproachSelector} onOpenChange={setShowApproachSelector}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shadow-elegant hover:shadow-glow transition-all"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Choose Orchestration Approach</DialogTitle>
              <DialogDescription>
                Select how you want the system to process your queries
              </DialogDescription>
            </DialogHeader>
            <ApproachSelector
              selectedApproach={selectedApproach}
              onSelectApproach={(approach) => {
                setSelectedApproach(approach);
                setShowApproachSelector(false);
                toast.success(`Switched to Approach ${approach}`, {
                  description: approach === 1 
                    ? 'Using direct orchestration with FAISS tool filtering'
                    : 'Using Magentic multi-agent collaboration'
                });
              }}
            />
          </DialogContent>
        </Dialog>
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
                  Try one of these example queries for {getApproachBadge()}:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {currentExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example)}
                    className="group p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-gradient-primary hover:text-white transition-all duration-300 text-left"
                  >
                    <p className="text-sm font-medium">{example}</p>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowApproachSelector(true)}
                className="mt-4"
              >
                Change Approach
              </Button>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ChatMessage
                      role={message.role}
                      content={message.content}
                      timestamp={message.timestamp}
                    />
                    {message.approach && message.role === 'assistant' && (
                      <Badge variant="outline" className="text-xs">
                        A{message.approach}
                      </Badge>
                    )}
                  </div>
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
              placeholder={`Ask me anything (using ${selectedApproach === 1 ? 'Direct Orchestration' : 'Magentic Multi-Agent'})...`}
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
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}