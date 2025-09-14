const ChatSkeleton = () => {
    return (
      <div className="space-y-3 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="ml-2 flex-1 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default ChatSkeleton
  