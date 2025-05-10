import Skeleton from "react-loading-skeleton";

const VaccineRowSkeletonLoading = () => {
  return (
    <div className="flex flex-col">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex flex-row px-[16px] py-[8px]">
          <div className="flex flex-row w-[14.28%] justify-start">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[17.56%] justify-start">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[14.28%] justify-start">
            <Skeleton height={30} width={120} />
          </div>
          <div className="flex flex-row w-[14.28%] justify-center">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[20.28%] justify-center">
            <Skeleton height={30} width={80} />
          </div>
          <div className="flex flex-row w-[14.28%] justify-center">
            <Skeleton height={30} width={100} />
          </div>
          <div className="flex flex-row w-[5%]">
            <Skeleton height={30} width={50} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VaccineRowSkeletonLoading;
