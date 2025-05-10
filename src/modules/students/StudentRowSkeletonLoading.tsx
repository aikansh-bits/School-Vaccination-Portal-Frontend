import Skeleton from "react-loading-skeleton";

const StudentRowSkeletonLoading = () => {
  return (
    <div className="flex flex-col">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex flex-row px-[16px] py-[8px]">
          <div className="flex flex-row w-[12.5%] justify-start">
            <Skeleton height={30} width={80} />
          </div>
          <div className="flex flex-row w-[12.5%] justify-start">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[12.5%] justify-start">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[16%] justify-start">
            <Skeleton height={30} width={120} />
          </div>
          <div className="flex flex-row w-[12.5%] justify-start">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[12.5%] justify-start">
            <Skeleton height={30} width={80} />
          </div>
          <div className="flex flex-row w-[16%] justify-start">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[5%] justify-end">
            <Skeleton height={30} width={50} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentRowSkeletonLoading;
