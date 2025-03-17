
import { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userHasLiked?: boolean;
  userHasDisliked?: boolean;
}

interface NewsCommentsProps {
  articleId: string;
}

export function NewsComments({ articleId }: NewsCommentsProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'JaneDoe',
      content: 'This is great reporting! I was just at this location yesterday.',
      timestamp: '2 hours ago',
      likes: 5,
      dislikes: 1,
    },
    {
      id: '2',
      username: 'LocalResident',
      content: 'I appreciate the balanced coverage on this issue.',
      timestamp: '5 hours ago',
      likes: 12,
      dislikes: 0,
    }
  ]);
  const { toast } = useToast();

  const handleSubmitComment = () => {
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      username: 'You',
      content: comment,
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0,
    };

    setComments([newComment, ...comments]);
    setComment('');

    toast({
      title: "Comment posted",
      description: "Thank you for your feedback on this article!",
    });
  };

  const handleLikeComment = (id: string, isLike: boolean) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        if (isLike) {
          // If user already liked, remove like
          if (comment.userHasLiked) {
            return { ...comment, likes: comment.likes - 1, userHasLiked: false };
          }
          // If user disliked before, remove dislike and add like
          else if (comment.userHasDisliked) {
            return {
              ...comment,
              likes: comment.likes + 1,
              dislikes: comment.dislikes - 1,
              userHasLiked: true,
              userHasDisliked: false
            };
          }
          // Regular like
          else {
            return { ...comment, likes: comment.likes + 1, userHasLiked: true };
          }
        } else {
          // If user already disliked, remove dislike
          if (comment.userHasDisliked) {
            return { ...comment, dislikes: comment.dislikes - 1, userHasDisliked: false };
          }
          // If user liked before, remove like and add dislike
          else if (comment.userHasLiked) {
            return {
              ...comment,
              likes: comment.likes - 1,
              dislikes: comment.dislikes + 1,
              userHasLiked: false,
              userHasDisliked: true
            };
          }
          // Regular dislike
          else {
            return { ...comment, dislikes: comment.dislikes + 1, userHasDisliked: true };
          }
        }
      }
      return comment;
    }));
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-medium">Comments ({comments.length})</h3>
      </div>

      {/* Comment input */}
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full text-sm">U</div>
        </Avatar>
        <div className="relative flex-1">
          <Input
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={handleSubmitComment}
            disabled={!comment.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Submit comment</span>
          </Button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <div className="bg-secondary text-secondary-foreground flex h-full w-full items-center justify-center rounded-full text-xs">
                    {comment.username.charAt(0)}
                  </div>
                </Avatar>
                <span className="font-medium text-sm">{comment.username}</span>
              </div>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${comment.userHasLiked ? 'text-primary' : ''}`}
                onClick={() => handleLikeComment(comment.id, true)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${comment.userHasDisliked ? 'text-destructive' : ''}`}
                onClick={() => handleLikeComment(comment.id, false)}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{comment.dislikes}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsComments;
