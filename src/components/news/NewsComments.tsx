
import { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { commentsService } from '@/services/api';

interface Comment {
  id: string;
  articleId: string;
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
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch comments for this article
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const data = await commentsService.getByArticleId(articleId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: 'Error',
          description: 'Failed to load comments. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [articleId, toast]);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      // Using 'You' as the default username - in a real app, this would come from auth
      const username = 'You';
      const newComment = await commentsService.addComment(articleId, username, comment);
      
      // Add userHasLiked property since it's used in the UI
      const enhancedComment = { ...newComment, userHasLiked: false, userHasDisliked: false };
      
      setComments([enhancedComment, ...comments]);
      setComment('');

      toast({
        title: "Comment posted",
        description: "Thank you for your feedback on this article!",
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to post your comment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleLikeComment = async (id: string, isLike: boolean) => {
    try {
      // Call the appropriate API endpoint
      if (isLike) {
        await commentsService.likeComment(id);
      } else {
        await commentsService.dislikeComment(id);
      }

      // Update local state for immediate UI feedback
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
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to update the comment. Please try again.',
        variant: 'destructive',
      });
    }
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

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-pulse">Loading comments...</div>
        </div>
      )}

      {/* Comments list */}
      {!isLoading && comments.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}

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
              <span className="text-xs text-muted-foreground">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
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
