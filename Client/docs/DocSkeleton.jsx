export default function DocSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-1/3 bg-[#1e1e2f] rounded"></div>

      <div className="space-y-2">
        <div className="h-4 bg-[#1e1e2f] rounded"></div>
        <div className="h-4 bg-[#1e1e2f] rounded w-[90%]"></div>
        <div className="h-4 bg-[#1e1e2f] rounded w-[80%]"></div>
      </div>

      <div className="h-32 bg-[#1e1e2f] rounded-lg"></div>

      <div className="space-y-2">
        <div className="h-4 bg-[#1e1e2f] rounded"></div>
        <div className="h-4 bg-[#1e1e2f] rounded w-[70%]"></div>
      </div>
    </div>
  )
}
