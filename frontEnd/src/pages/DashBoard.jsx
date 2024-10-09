import Dheader from "../comppnents/Dashboard/Dheader";
import Container from "../comppnents/Dashboard/Container";
import Aside from "../comppnents/Dashboard/Aside";
import DNavbar from "../comppnents/Dashboard/DNavbar";

const DashBoard = () => {

  

  
  return (
    <div className="h-screen w-screen overflow-auto m-0 p-0 flex flex-col box-border">
      {/* Navbar */}
        <DNavbar />
      

      {/* Main content */}
      <div className="flex-1 flex flex-row mt-0">
        {/* Sidebar */}
        <Aside />
        {/* Content */}
        <div className="flex-1 overflow-auto w-full">
          <Container  />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
