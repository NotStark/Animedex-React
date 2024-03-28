type SliderSkeletonProps = {
  error?: Error | string | null;
};

export default function SliderSkeleton({ error }: SliderSkeletonProps) {
  return (
    <div className={` bg-skeleton w-full h-[40vh] sm:h-[60dvh] grid place-content-center ${!error && 'animate-pulse'}`}>
      {error instanceof Error ? (
        <h4 className="text-textColor bg-backgroundColor/20 px-3 py-4 rounded-md">
          {error.message}
        </h4>
      ) : error ? (
        <h4 className="text-textColor bg-backgroundColor/20 px-3 py-4 rounded-md">
          {error}
        </h4>
      ) : null}
    </div>
  );
}
