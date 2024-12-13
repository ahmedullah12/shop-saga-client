import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReviewCommentProps {
  comment: string;
  maxLength?: number;
}

const ReviewComment = ({ 
  comment, 
  maxLength = 40 
}: ReviewCommentProps) => {
  const truncatedComment = comment.length > maxLength 
    ? `${comment.slice(0, maxLength)}...` 
    : comment;

  if (comment.length <= maxLength) {
    return <span>{comment}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-gray-400">
            {truncatedComment}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs sm:max-w-md md:max-w-lg bg-white shadow-lg border p-3 rounded-md"
        >
          <div className="text-sm text-gray-800">{comment}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ReviewComment;