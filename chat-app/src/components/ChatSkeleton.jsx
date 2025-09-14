const ChatSkeleton = () => {
    return (
      <div className="space-y-3 animate-pulse">
        {[...Array(24)].map((_, i) => {
          const isReceiver = i % 2 === 0; // Even index → receiver, Odd index → sender
          return (
            <div
              key={i}
              className={`flex ${isReceiver ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start ${isReceiver ? 'flex-row' : 'flex-row-reverse'} space-x-2 space-x-reverse`}>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className={`p-2 rounded-xl ${isReceiver ? 'bg-gray-200' : 'bg-blue-500'} min-w-[100px] max-w-xs`}>
                  <div className={`h-3 rounded ${isReceiver ? 'bg-gray-300' : 'bg-blue-400'} mb-2 w-3/4`}></div>
                  <div className={`h-3 rounded ${isReceiver ? 'bg-gray-300' : 'bg-blue-400'} w-1/2`}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  
  export default ChatSkeleton
  