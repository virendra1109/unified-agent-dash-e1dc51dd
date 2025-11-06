// import { Bot, User } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface ChatMessageProps {
//   role: 'user' | 'assistant';
//   content: string;
//   timestamp?: number;
// }

// export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
//   const isUser = role === 'user';

//   return (
//     <div
//       className={cn(
//         'flex gap-4 animate-fade-in',
//         isUser ? 'flex-row-reverse' : 'flex-row'
//       )}
//     >
//       {/* Avatar */}
//       <div
//         className={cn(
//           'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
//           isUser ? 'bg-gradient-primary' : 'bg-muted'
//         )}
//       >
//         {isUser ? (
//           <User className="h-5 w-5 text-white" />
//         ) : (
//           <Bot className="h-5 w-5 text-foreground" />
//         )}
//       </div>

//       {/* Message Bubble */}
//       <div
//         className={cn(
//           'max-w-[70%] rounded-2xl px-5 py-3 shadow-elegant',
//           isUser
//             ? 'bg-gradient-primary text-white'
//             : 'bg-card text-card-foreground border border-border'
//         )}
//       >
//         <p className="whitespace-pre-wrap break-words">{content}</p>
//         {timestamp && (
//           <p className={cn('mt-2 text-xs', isUser ? 'text-white/70' : 'text-muted-foreground')}>
//             {new Date(timestamp).toLocaleTimeString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
<<<<<<< HEAD
// src/components/ChatMessage.tsx - FIXED VERSION
=======


>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
<<<<<<< HEAD
    <div className="w-full animate-fade-in">
      <div
        className={cn(
          'flex gap-4 items-start max-w-full',
          isUser ? 'flex-row-reverse' : 'flex-row'
=======
    <div
      className={cn(
        'flex gap-4 animate-fade-in mb-6',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
          isUser ? 'bg-gradient-primary shadow-glow' : 'bg-muted'
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
            isUser ? 'bg-gradient-primary' : 'bg-muted'
          )}
        >
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-foreground" />
          )}
        </div>

<<<<<<< HEAD
        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              'inline-block rounded-2xl px-5 py-3 shadow-elegant max-w-[85%]',
              isUser
                ? 'bg-gradient-primary text-white ml-auto'
                : 'bg-card text-card-foreground border border-border'
            )}
          >
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{content}</p>
            {timestamp && (
              <p className={cn('mt-2 text-xs', isUser ? 'text-white/70' : 'text-muted-foreground')}>
                {new Date(timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
=======
      {/* Message Bubble */}
      <div
        className={cn(
          'flex-1 max-w-[85%] rounded-2xl px-6 py-4 shadow-elegant',
          isUser
            ? 'bg-gradient-primary text-white'
            : 'bg-card text-card-foreground border border-border'
        )}
      >
        {isUser ? (
          // User messages - simple text
          <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p>
        ) : (
          // Assistant messages - render markdown
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Headings
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mt-4 mb-2 text-foreground border-b border-border pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mt-4 mb-2 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold mt-3 mb-2 text-foreground">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-base font-semibold mt-2 mb-1 text-foreground">
                    {children}
                  </h4>
                ),
                // Paragraphs
                p: ({ children }) => (
                  <p className="mb-3 leading-relaxed text-card-foreground">
                    {children}
                  </p>
                ),
                // Lists
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-3 space-y-1 text-card-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-3 space-y-1 text-card-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="ml-2 text-card-foreground">{children}</li>
                ),
                // Code
                code: ({ inline, children, ...props }: any) =>
                  inline ? (
                    <code
                      className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      className="block px-4 py-3 rounded-lg bg-muted text-foreground font-mono text-sm overflow-x-auto my-2"
                      {...props}
                    >
                      {children}
                    </code>
                  ),
                pre: ({ children }) => (
                  <pre className="bg-muted rounded-lg p-4 overflow-x-auto my-3">
                    {children}
                  </pre>
                ),
                // Links
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {children}
                  </a>
                ),
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-3">
                    {children}
                  </blockquote>
                ),
                // Strong/Bold
                strong: ({ children }) => (
                  <strong className="font-bold text-foreground">{children}</strong>
                ),
                // Emphasis/Italic
                em: ({ children }) => (
                  <em className="italic text-foreground">{children}</em>
                ),
                // Horizontal Rule
                hr: () => (
                  <hr className="border-t border-border my-4" />
                ),
                // Tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full divide-y divide-border">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-border">{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr>{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left text-sm font-semibold text-foreground">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 text-sm text-card-foreground">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        
        {timestamp && (
          <p className={cn('mt-3 text-xs', isUser ? 'text-white/70' : 'text-muted-foreground')}>
            {new Date(timestamp).toLocaleTimeString()}
          </p>
        )}
>>>>>>> 0a18f4e417390a12c13e650aecaa461316d4463f
      </div>
    </div>
  );
}