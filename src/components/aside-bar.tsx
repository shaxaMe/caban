import { NavLink } from "react-router";
import { House, CalendarCheck2, WrapText } from "lucide-react";
import {useUserStore} from "@/store/user"
function Aside() {
  const {toggle,setToggle} = useUserStore()
  

  function handleOpen() {
    setToggle();
  }

  
  return (
    <div
      className={`py-4 px-2 bg-slate-50 w-full transition-all duration-300 ease-in-out ${
        toggle ? "max-w-[80px]" : "max-w-[250px]"
      }`}>
      <div onClick={handleOpen} className="flex items-center justify-end mb-10">
        <div className="bg-slate-500 p-1 rounded-lg text-white cursor-pointer">
          <WrapText className="w-5 h-5" />
        </div> 
      </div>
      <div className="flex flex-col gap-2">
        <NavLink to={"/"}>
          {({ isActive }) => (
            <div
              className={`flex gap-2 items-center group  border-r-2 border-transparent hover:border-r-[#536dfe92] px-2 transition-all duration-300 ${
                isActive ? "border-r-[#536dfe92]" : ""
              }`}>
              <div
                className={`py-2 px-3 group-hover:bg-[#536dfe2d] group-hover:text-primary rounded-md flex gap-2 items-center w-full ${
                  isActive ? "bg-[#536dfe2d] text-primary" : ""
                }`}>
                <House className="w-5 h-5" />
                {!toggle && <span className="order-2">Home</span>}
              </div>
            </div>
          )}
        </NavLink>
        <NavLink to={"/todo"}>
          {({ isActive }) => (
            <div
              className={`flex gap-2 items-center group  border-r-2 border-transparent hover:border-r-[#536dfe92] px-2 transition-all duration-300 ${
                isActive ? "border-r-[#536dfe92]" : ""
              }`}>
              <div
                className={`py-2 px-3 group-hover:bg-[#536dfe2d] group-hover:text-primary rounded-md flex gap-2 items-center w-full ${
                  isActive ? "bg-[#536dfe2d] text-primary" : ""
                }`}>
                <CalendarCheck2 className="w-5 h-5" />
                {!toggle && <span className="order-2">Todo</span>}
              </div>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default Aside;
