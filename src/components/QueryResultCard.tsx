// import { CheckCircle2, XCircle, Clock, Zap, Wrench } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { QueryResponse } from '@/lib/api';
// import { cn } from '@/lib/utils';

// interface QueryResultCardProps {
//   result: QueryResponse;
//   processingTime?: number;
// }

// export default function QueryResultCard({ result, processingTime }: QueryResultCardProps) {
//   return (
//     <Card className="animate-slide-up border-2 shadow-elegant hover:shadow-glow transition-all duration-300">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle className="flex items-center gap-2">
//             {result.success ? (
//               <>
//                 <CheckCircle2 className="h-6 w-6 text-success" />
//                 <span>Query Executed Successfully</span>
//               </>
//             ) : (
//               <>
//                 <XCircle className="h-6 w-6 text-destructive" />
//                 <span>Query Failed</span>
//               </>
//             )}
//           </CardTitle>
//           {processingTime && (
//             <Badge variant="secondary" className="gap-1">
//               <Clock className="h-3 w-3" />
//               {processingTime.toFixed(2)}s
//             </Badge>
//           )}
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {/* Orchestrator Plan */}
//         <div className="space-y-2">
//           <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
//             <Zap className="h-4 w-4 text-primary" />
//             Orchestrator Plan
//           </div>
//           <div className="rounded-lg bg-muted p-4 space-y-2">
//             <div>
//               <span className="text-sm text-muted-foreground">Selected Servers:</span>
//               <div className="mt-1 flex flex-wrap gap-2">
//                 {result.plan.servers.map((server) => (
//                   <Badge key={server} variant="outline" className="bg-background">
//                     {server}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <span className="text-sm text-muted-foreground">Tool Queries:</span>
//               <div className="mt-1 space-y-1">
//                 {Object.entries(result.plan.tool_queries).map(([server, query]) => (
//                   <div key={server} className="text-sm">
//                     <span className="font-medium">{server}:</span> {query}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Selected Tools */}
//         <div className="space-y-2">
//           <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
//             <Wrench className="h-4 w-4 text-primary" />
//             Selected Tools
//           </div>
//           <div className="rounded-lg bg-muted p-4">
//             {Object.entries(result.selected_tools).map(([server, tools]) => (
//               <div key={server} className="mb-3 last:mb-0">
//                 <div className="mb-1 text-sm font-medium">{server}</div>
//                 <div className="flex flex-wrap gap-2">
//                   {tools.map((tool) => (
//                     <Badge
//                       key={tool}
//                       className={cn(
//                         'bg-gradient-primary text-white border-none',
//                         'hover:shadow-glow transition-all duration-200'
//                       )}
//                     >
//                       {tool}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </CardContent>
//     </Card>
//   );
// }


// src/components/QueryResultCard.tsx - FIXED VERSION
import { CheckCircle2, XCircle, Clock, Zap, Wrench, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QueryResponse } from '@/lib/api';
import { cn } from '@/lib/utils';

interface QueryResultCardProps {
  result: QueryResponse;
  processingTime?: number;
}

export default function QueryResultCard({ result, processingTime }: QueryResultCardProps) {
  const isApproach2 = result.approach === 2;
  
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
          <div className="flex items-center gap-2">
            {processingTime && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {processingTime.toFixed(2)}s
              </Badge>
            )}
            <Badge className={cn(
              "text-white border-none",
              isApproach2 ? "bg-gradient-to-r from-purple-500 to-pink-600" : "bg-gradient-to-r from-blue-500 to-purple-600"
            )}>
              {isApproach2 ? 'Approach 2' : 'Approach 1'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Approach 1: Orchestrator Plan */}
        {!isApproach2 && result.plan && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Zap className="h-4 w-4 text-primary" />
                Orchestrator Plan
              </div>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                {result.plan.servers && result.plan.servers.length > 0 && (
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
                )}
                {result.plan.tool_queries && Object.keys(result.plan.tool_queries).length > 0 && (
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
                )}
              </div>
            </div>

            {/* Selected Tools */}
            {result.selected_tools && Object.keys(result.selected_tools).length > 0 && (
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
            )}
          </>
        )}

        {/* Approach 2: Agent Collaboration */}
        {isApproach2 && result.plan && (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-purple-600" />
                Agent Collaboration
              </div>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                {result.plan.agents && result.plan.agents.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Selected Agents:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {result.plan.agents.map((agent) => (
                        <Badge key={agent} variant="outline" className="bg-background">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {result.plan.tool_queries && Object.keys(result.plan.tool_queries).length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Agent Tool Queries:</span>
                    <div className="mt-1 space-y-1">
                      {Object.entries(result.plan.tool_queries).map(([agent, query]) => (
                        <div key={agent} className="text-sm">
                          <span className="font-medium">{agent}:</span> {query}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Agents Used */}
            {result.agents_used && result.agents_used.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Wrench className="h-4 w-4 text-purple-600" />
                  Agents Executed
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex flex-wrap gap-2">
                    {result.agents_used.map((agent) => (
                      <Badge
                        key={agent}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none hover:shadow-glow transition-all duration-200"
                      >
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Error Display */}
        {!result.success && result.error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
            <p className="text-sm text-destructive font-medium">Error:</p>
            <p className="text-sm text-destructive/80 mt-1">{result.error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}