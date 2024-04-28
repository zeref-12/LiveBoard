import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";



interface DashboardLayoutProps{
    children: React.ReactNode
};

const DashboardLayout = ({
    children,
}: DashboardLayoutProps) => {
    return(
        <main className="h-full">
            <Sidebar/>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="flex-1 h-full">
                        <Navbar/>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;

