import { isMobile } from "react-device-detect";
import * as Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingChat() {
  return (
    <div
      style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
      className="transition-all duration-500 relative md:ml-[2px] md:mr-[8px] md:my-[16px] md:rounded-[26px] bg-stone-200 w-full md:min-w-[82%] p-[18px] h-full overflow-y-scroll"
    >
      <Skeleton.default
        height="250px"
        width="100%"
        baseColor={"#fff"}
        highlightColor={"#d1d1d1"}
        count={1}
        className="max-w-full md:max-w-[100%] p-4 rounded-b-2xl rounded-tr-2xl rounded-tl-sm mt-6"
        containerClassName="flex justify-center"
      />
      <Skeleton.default
        height="250px"
        width="100%"
        baseColor={"#fff"}
        highlightColor={"#d1d1d1"}
        count={1}
        className="max-w-full md:max-w-[100%] p-4 rounded-b-2xl rounded-tr-2xl rounded-tl-sm mt-6"
        containerClassName="flex justify-center"
      />
      <Skeleton.default
        height="250px"
        width="100%"
        baseColor={"#fff"}
        highlightColor={"#d1d1d1"}
        count={1}
        className="max-w-full md:max-w-[100%] p-4 rounded-b-2xl rounded-tr-2xl rounded-tl-sm mt-6"
        containerClassName="flex justify-center"
      />
      <Skeleton.default
        height="250px"
        width="100%"
        baseColor={"#fff"}
        highlightColor={"#d1d1d1"}
        count={1}
        className="max-w-full md:max-w-[100%] p-4 rounded-b-2xl rounded-tr-2xl rounded-tl-sm mt-6"
        containerClassName="flex justify-center"
      />
    </div>
  );
}
