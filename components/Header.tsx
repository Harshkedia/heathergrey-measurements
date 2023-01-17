export const Header = () => (
  <div className="w-screen bg-white h-[90px] flex items-center justify-center fixed top-0 left-0 z-[999] shadow-sm">
    <div className="flex items-center w-4/5 h-full">
      <img src="/header.png" alt="" className="h-[70px]" />
      <div className="flex items-center justify-evenly grow uppercase font-[500] cursor-pointer text-[15px]">
        <p>Shop</p>
        <p className="text-[#DB302B]">Measurement</p>
        <p>About</p>
        <p>Contact</p>
        <p>Back to the website</p>
      </div>
    </div>
  </div>
);
