import { CheckCircle2, XCircle, Clock, Zap, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QueryResponse } from '@/lib/api';
import { cn } from '@/lib/utils';

interface QueryResultCardProps {
  result: QueryResponse;
  processingTime?: number;
}

export default function QueryResultCard({ result, processingTime }: QueryResultCardProps) {
  return (
    <Card className="animate-slide-up border-2 shadow-elegant hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {result.success ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-success" />
                <span>Query Executed Successfully</span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-destructive" />
                <span>Query Failed</span>
              </>
            )}
          </CardTitle>
          {processingTime && (
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {processingTime.toFixed(2)}s
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Orchestrator Plan */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Orchestrator Plan
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Selected Servers:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {result.plan.servers.map((server) => (
                  <Badge key={server} variant="outline" className="bg-background">
                    {server}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Tool Queries:</span>
              <div className="mt-1 space-y-1">
                {Object.entries(result.plan.tool_queries).map(([server, query]) => (
                  <div key={server} className="text-sm">
                    <span className="font-medium">{server}:</span> {query}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Tools */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Wrench className="h-4 w-4 text-primary" />
            Selected Tools
          </div>
          <div className="rounded-lg bg-muted p-4">
            {Object.entries(result.selected_tools).map(([server, tools]) => (
              <div key={server} className="mb-3 last:mb-0">
                <div className="mb-1 text-sm font-medium">{server}</div>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <Badge
                      key={tool}
                      className={cn(
                        'bg-gradient-primary text-white border-none',
                        'hover:shadow-glow transition-all duration-200'
                      )}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Result */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-foreground">Final Result</div>
          <div
            className={cn(
              'rounded-lg p-4 border-2',
              result.success
                ? 'bg-success/10 border-success/30 text-success-foreground'
                : 'bg-destructive/10 border-destructive/30 text-destructive-foreground'
            )}
          >
            <p className="whitespace-pre-wrap">{result.result || result.error || 'No result'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
