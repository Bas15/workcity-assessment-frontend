import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  rounded = true,
}) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-gray-800",
        rounded ? "rounded-md" : "",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
    </div>
  );
};

export default Skeleton;
