export default function ShopCardSkeleton() {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />

      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />

      <div className="flex items-center gap-2 mb-1">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-8" />
      </div>

      <div className="h-9 bg-gray-200 rounded w-24" />
    </div>
  );
}
