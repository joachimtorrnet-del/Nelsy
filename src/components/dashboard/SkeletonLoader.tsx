export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
      <div className="h-8 bg-gray-200 rounded w-32 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-16" />
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded-xl flex-1" />
        <div className="h-8 bg-gray-200 rounded-xl flex-1" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-12" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 animate-pulse">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-6" />
      <div className="h-48 bg-gray-200 rounded" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
}

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`animate-spin rounded-full border-4 border-[#F52B8C] border-t-transparent ${sizeClasses[size]}`} />
  );
}

export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <Spinner size="lg" />
      <p className="text-gray-600 mt-4">{message}</p>
    </div>
  );
}
