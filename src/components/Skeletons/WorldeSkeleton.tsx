import Skeleton from "react-loading-skeleton";

const WorldeSkeleton = () => {
  return (
    <div>
      <Skeleton height={55} />
      <div className="panel has-text-light">
        <div className="panel-block is-skeleton">
          <div className="words">
            <div className="is-flex is-justify-content-space-between is-flex-wrap-wrap">
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
              <Skeleton width={180} height={40} className="mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldeSkeleton;
