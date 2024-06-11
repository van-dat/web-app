import Skeleton from "react-loading-skeleton";

const SkeletonDetail = () => {
  return (
    <div className=" pr-2 pl-2">
      <div className="has-text-light">
        <div className="words">
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail;
