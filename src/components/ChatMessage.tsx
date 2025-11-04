import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex gap-4 animate-fade-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
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

      {/* Message Bubble */}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-5 py-3 shadow-elegant',
          isUser
            ? 'bg-gradient-primary text-white'
            : 'bg-card text-card-foreground border border-border'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
        {timestamp && (
          <p className={cn('mt-2 text-xs', isUser ? 'text-white/70' : 'text-muted-foreground')}>
            {new Date(timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
