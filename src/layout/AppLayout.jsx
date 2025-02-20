import Main from "./Main";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] h-screen w-full">
      <Sidebar />
      <MobileSidebar />
      <Main />
    </div>
  );
}

export default AppLayout;
