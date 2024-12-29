import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm mx-auto relative flex flex-col animate-pulse">
      <CardHeader className="p-0">
        <div className="w-full h-40 bg-gray-200 rounded-t-md" />
      </CardHeader>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        
        <div className="space-y-2 mt-1">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center p-4 pt-0 mt-auto">
        <div className="h-9 bg-gray-200 rounded w-28" />
        <div className="h-9 bg-gray-200 rounded w-28" />
      </CardFooter>
    </Card>
  );
}