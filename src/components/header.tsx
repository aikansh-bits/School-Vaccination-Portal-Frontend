const Header = () => {
  return (
    <div className="flex flex-row gap-[16px] self-end">
      <div className="flex flex-col">
        <span>Hello! Aikansh Boyal</span>
        <span className="text-[12px] self-end">Co-ordinator</span>
      </div>
      <div className="h-[40px] w-[40px] rounded-full bg-lightBlue flex items-center justify-center">
        <img
          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
          alt=""
          className="h-[32px] w-[32px] rounded-full"
        />
      </div>
    </div>
  );
};
export default Header;
