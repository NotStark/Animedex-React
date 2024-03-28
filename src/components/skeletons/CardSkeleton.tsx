type CardSkeletonProps = {
  error?: Error | string | null;
};

export default function CardSkeleton({ error }: CardSkeletonProps) {
  return (
    <div className={`bg-skeleton  cursor-pointer rounded-sm h-[260px] md:h-[300px] grid place-content-center px-3 ${!error && 'animate-pulse'}`}>
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
  );
}
