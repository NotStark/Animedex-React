type AnimeDetailsSkeletonProps = {
    error?: Error | string | null;
  };
  
  export default function AnimeDetailsSkeleton({ error }: AnimeDetailsSkeletonProps) {
    return (
      <div className="md:px-32">
        <div className={`bg-skeleton w-full h-[50vh] sm:h-[60dvh] grid place-content-center ${!error && 'animate-pulse'}`}>
        {error instanceof Error ? (
          <h4 className="text-textColor bg-backgroundColor/20 px-3 py-4 rounded-md text-sm">
            {error.message}
          </h4>
        ) : error ? (
          <h4 className="text-textColor bg-backgroundColor/20 px-3 py-4 rounded-md text-sm">
            {error}
          </h4>
        ) : null}
      </div>
      </div>
    );
  }
  