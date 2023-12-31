import { Sidebar } from "@/components/Sidebar";
import { DashboardWrapper } from "./_components/wrapper";
import { Navbar } from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <DashboardWrapper>
        <Navbar />
        {children}
      </DashboardWrapper>
    </div>
  );
};

export default DashboardLayout;
