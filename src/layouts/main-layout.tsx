type IProps = {
  children: React.ReactNode;
};
import Aside from "@/components/aside-bar";
import Navbar from "@/components/navbar";
function MainLayout({ children }: IProps) {
  return (
    <div className="flex h-full min-h-screen">
      <Aside />
      <div className="w-full flex-1">
        <Navbar />
        <div className="py-4 px-2">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
