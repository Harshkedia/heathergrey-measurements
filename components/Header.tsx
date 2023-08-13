import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { storeName } = router.query;
  return (
    <div className="w-screen bg-white h-[90px] flex items-center justify-between z-[999] shadow-sm px-[8rem]">
      <div className="flex items-center w-4/5 h-full">
        <div className="grow uppercase font-[500] cursor-pointer text-[15px]">
          <a href={"https://heathergreycollective.com/store"}>
            Back to the website
          </a>
        </div>
      </div>
      <div>
        <p>{storeName}</p>
      </div>
    </div>
  );
};
