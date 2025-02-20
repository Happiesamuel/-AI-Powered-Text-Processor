import MainBody from "./MainBody";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function Main() {
  return (
    <div className="bg-[#292a2d] flex flex-col h-screen relative">
      <MainHeader />
      <div className="mx-auto h-full w-[95%] md:w-[80%] mb-2  ">
        <div className="h-[68vh]">
          <MainBody />
        </div>
        <div className="fixed  bottom-[2%] w-[95%] md:w-[80%]">
          <MainFooter />
        </div>
      </div>
    </div>
  );
}

export default Main;
