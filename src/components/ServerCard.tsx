// import { Server, Trash2, Wrench } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import { ServerInfo } from '@/lib/api';

// interface ServerCardProps {
//   server: ServerInfo;
//   onDelete: (serverName: string) => void;
// }

// export default function ServerCard({ server, onDelete }: ServerCardProps) {
//   return (
//     <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-glow animate-fade-in">
//       {/* Background Gradient on Hover */}
//       <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

//       <CardHeader>
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
//               <Server className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <CardTitle className="text-xl">{server.name}</CardTitle>
//               <CardDescription className="mt-1 flex items-center gap-2">
//                 <Badge variant="outline" className="text-xs">
//                   {server.type}
//                 </Badge>
//                 <div className="flex items-center gap-1">
//                   <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
//                   <span className="text-xs">{server.status}</span>
//                 </div>
//               </CardDescription>
//             </div>
//           </div>

//           {/* Delete Button */}
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Remove Server</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   Are you sure you want to remove "{server.name}"? This action cannot be undone.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction
//                   onClick={() => onDelete(server.name)}
//                   className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                 >
//                   Remove
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <p className="text-sm text-muted-foreground mb-4">
//           {server.description || 'No description available'}
//         </p>

//         <div className="flex items-center gap-2 text-sm text-foreground">
//           <Wrench className="h-4 w-4 text-primary" />
//           <span className="font-semibold">{server.tools_count}</span>
//           <span className="text-muted-foreground">
//             {server.tools_count === 1 ? 'tool' : 'tools'} available
//           </span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


import { Server, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServerInfo } from '@/lib/api';

interface ServerCardProps {
  server: ServerInfo;
}

export default function ServerCard({ server }: ServerCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-glow animate-fade-in">
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Server className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{server.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {server.type}
                </Badge>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs">{server.status}</span>
                </div>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {server.description || 'No description available'}
        </p>

        <div className="flex items-center gap-2 text-sm text-foreground">
          <Wrench className="h-4 w-4 text-primary" />
          <span className="font-semibold">{server.tools_count}</span>
          <span className="text-muted-foreground">
            {server.tools_count === 1 ? 'tool' : 'tools'} available
          </span>
        </div>
      </CardContent>
    </Card>
  );
}