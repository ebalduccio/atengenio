export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={`container mx-auto max-w-7xl px-4 md:px-6 ${className}`}>
        {children}
      </div>
    )
  }