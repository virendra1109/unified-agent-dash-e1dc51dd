// // src/components/ApproachSelector.tsx
// import { useState, useEffect } from 'react';
// import { Zap, Users, CheckCircle2, ArrowRight } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';

// interface Approach {
//   id: number;
//   name: string;
//   description: string;
//   features: string[];
//   available: boolean;
//   servers?: string[];
//   agents?: string[];
// }

// interface ApproachSelectorProps {
//   selectedApproach: number;
//   onSelectApproach: (approach: number) => void;
// }

// export default function ApproachSelector({ selectedApproach, onSelectApproach }: ApproachSelectorProps) {
//   const [approaches, setApproaches] = useState<Approach[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchApproaches();
//   }, []);

//   const fetchApproaches = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/approaches');
//       const data = await response.json();
//       setApproaches(data.approaches);
//     } catch (error) {
//       console.error('Failed to fetch approaches:', error);
//       // Fallback data
//       setApproaches([
//         {
//           id: 1,
//           name: "Direct Orchestration",
//           description: "Fast tool filtering with FAISS indexing. Best for single-step queries.",
//           features: [
//             "Direct MCP tool access",
//             "FAISS-based tool filtering",
//             "Quick response time",
//             "Ideal for simple queries"
//           ],
//           available: true,
//           servers: []
//         },
//         {
//           id: 2,
//           name: "Magentic Multi-Agent",
//           description: "Sophisticated agent collaboration using Microsoft's Agentic Framework. Best for complex multi-step workflows.",
//           features: [
//             "Multi-agent collaboration",
//             "Magentic workflow orchestration",
//             "Agent-to-agent data passing",
//             "Ideal for complex queries"
//           ],
//           available: false,
//           agents: []
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getIcon = (id: number) => {
//     return id === 1 ? Zap : Users;
//   };

//   const getGradient = (id: number) => {
//     return id === 1 ? 'from-blue-500 to-purple-600' : 'from-purple-500 to-pink-600';
//   };

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[1, 2].map((i) => (
//           <Card key={i} className="h-96 animate-pulse bg-muted" />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="text-center space-y-2">
//         <h2 className="text-2xl font-bold text-foreground">Select Your Approach</h2>
//         <p className="text-muted-foreground">
//           Choose how you want the system to process your queries
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {approaches.map((approach) => {
//           const Icon = getIcon(approach.id);
//           const isSelected = selectedApproach === approach.id;
//           const isAvailable = approach.available;

//           return (
//             <Card
//               key={approach.id}
//               className={cn(
//                 'relative overflow-hidden transition-all duration-300 cursor-pointer group',
//                 isSelected && 'ring-2 ring-primary shadow-glow scale-[1.02]',
//                 !isAvailable && 'opacity-60 cursor-not-allowed',
//                 isAvailable && !isSelected && 'hover:scale-[1.02] hover:shadow-elegant'
//               )}
//               onClick={() => isAvailable && onSelectApproach(approach.id)}
//             >
//               {/* Background gradient */}
//               <div className={cn(
//                 'absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity',
//                 getGradient(approach.id),
//                 isSelected && 'opacity-10'
//               )} />

//               {/* Selected indicator */}
//               {isSelected && (
//                 <div className="absolute top-4 right-4 z-10">
//                   <Badge className="bg-gradient-primary text-white border-none shadow-glow">
//                     <CheckCircle2 className="h-3 w-3 mr-1" />
//                     Selected
//                   </Badge>
//                 </div>
//               )}

//               <CardHeader>
//                 <div className="flex items-start gap-4">
//                   <div className={cn(
//                     'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all',
//                     getGradient(approach.id),
//                     isSelected && 'scale-110 shadow-glow'
//                   )}>
//                     <Icon className="h-8 w-8 text-white" />
//                   </div>
//                   <div className="flex-1 space-y-2">
//                     <CardTitle className="text-xl">{approach.name}</CardTitle>
//                     <CardDescription className="text-sm">
//                       {approach.description}
//                     </CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 {/* Features */}
//                 <div className="space-y-2">
//                   <p className="text-sm font-semibold text-foreground">Features:</p>
//                   <ul className="space-y-1.5">
//                     {approach.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <div className="h-1.5 w-1.5 rounded-full bg-primary" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Status */}
//                 <div className="pt-4 border-t border-border">
//                   {isAvailable ? (
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                         <span className="text-sm font-medium text-success">Ready</span>
//                       </div>
//                       {approach.servers && approach.servers.length > 0 && (
//                         <Badge variant="outline" className="text-xs">
//                           {approach.servers.length} servers
//                         </Badge>
//                       )}
//                       {approach.agents && approach.agents.length > 0 && (
//                         <Badge variant="outline" className="text-xs">
//                           {approach.agents.length} agents
//                         </Badge>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <div className="h-2 w-2 rounded-full bg-warning" />
//                       <span className="text-sm font-medium text-warning">Not Available</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Select button */}
//                 {isAvailable && !isSelected && (
//                   <Button
//                     className="w-full bg-gradient-primary text-white border-none shadow-glow hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onSelectApproach(approach.id);
//                     }}
//                   >
//                     Select This Approach
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// src/components/ApproachSelector.tsx
import { useState, useEffect } from 'react';
import { Zap, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Approach {
  id: number;
  name: string;
  description: string;
  features: string[];
  available: boolean;
  servers?: string[];
  agents?: string[];
}

interface ApproachSelectorProps {
  selectedApproach: number;
  onSelectApproach: (approach: number) => void;
}

export default function ApproachSelector({ selectedApproach, onSelectApproach }: ApproachSelectorProps) {
  const [approaches, setApproaches] = useState<Approach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApproaches();
  }, []);

  const fetchApproaches = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/approaches');
      const data = await response.json();
      setApproaches(data.approaches);
    } catch (error) {
      console.error('Failed to fetch approaches:', error);
      // Fallback data
      setApproaches([
        {
          id: 1,
          name: "Direct Orchestration",
          description: "Fast tool filtering with FAISS indexing. Best for single-step queries.",
          features: [
            "Direct MCP tool access",
            "FAISS-based tool filtering",
            "Quick response time",
            "Ideal for simple queries"
          ],
          available: true,
          servers: []
        },
        {
          id: 2,
          name: "Magentic Multi-Agent",
          description: "Sophisticated agent collaboration using Microsoft's Agentic Framework. Best for complex multi-step workflows.",
          features: [
            "Multi-agent collaboration",
            "Magentic workflow orchestration",
            "Agent-to-agent data passing",
            "Ideal for complex queries"
          ],
          available: false,
          agents: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (id: number) => {
    return id === 1 ? Zap : Users;
  };

  const getGradient = (id: number) => {
    return id === 1 ? 'from-blue-500 to-purple-600' : 'from-purple-500 to-pink-600';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="h-96 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Select Your Approach</h2>
        <p className="text-muted-foreground">
          Choose how you want the system to process your queries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {approaches.map((approach) => {
          const Icon = getIcon(approach.id);
          const isSelected = selectedApproach === approach.id;
          const isAvailable = approach.available;

          return (
            <Card
              key={approach.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300 cursor-pointer group',
                isSelected && 'ring-2 ring-primary shadow-glow scale-[1.02]',
                !isAvailable && 'opacity-60 cursor-not-allowed',
                isAvailable && !isSelected && 'hover:scale-[1.02] hover:shadow-elegant'
              )}
              onClick={() => isAvailable && onSelectApproach(approach.id)}
            >
              {/* Background gradient */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity',
                getGradient(approach.id),
                isSelected && 'opacity-10'
              )} />

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-primary text-white border-none shadow-glow">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Selected
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all',
                    getGradient(approach.id),
                    isSelected && 'scale-110 shadow-glow'
                  )}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-xl">{approach.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {approach.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Features:</p>
                  <ul className="space-y-1.5">
                    {approach.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status */}
                <div className="pt-4 border-t border-border">
                  {isAvailable ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm font-medium text-success">Ready</span>
                      </div>
                      {approach.servers && approach.servers.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {approach.servers.length} servers
                        </Badge>
                      )}
                      {approach.agents && approach.agents.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {approach.agents.length} agents
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-warning" />
                      <span className="text-sm font-medium text-warning">Not Available</span>
                    </div>
                  )}
                </div>

                {/* Select button */}
                {isAvailable && !isSelected && (
                  <Button
                    className="w-full bg-gradient-primary text-white border-none shadow-glow hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectApproach(approach.id);
                    }}
                  >
                    Select This Approach
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}