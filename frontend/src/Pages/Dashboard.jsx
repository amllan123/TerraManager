import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Moon,
  Sun,
  LayoutDashboard,
} from "lucide-react";
import DashboardData from "./DashboardData";
import CreateResource from "./CreateResource";
import ResourceList from "./ResourceList";
import SettingPage from "./SettingPage";

const CloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
);

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // const items = [
  //   { title: "Home", icon: Home },
  //   { title: "Inbox", icon: Inbox },
  //   { title: "Calendar", icon: Calendar },
  //   { title: "Search", icon: Search },
  //   { title: "Settings", icon: Settings },
  // ];

  const items =[
    {title:"Dashboard", icon:"/assets/dashboard.png",id:1},
    {title:"Create Resource", icon:"/assets/create.png",id:2},
    {title:"Resource", icon:"/assets/server.png",id:3},
    {title:"Settings", icon:"/assets/setting.png",id:1},
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <Sidebar className="bg-white dark:bg-gray-800">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="mt-6 p-2">
                <a href="#" className="logo">
                  <span className="logo-icon">
                    <CloudIcon />
                  </span>
                  TerraManager
                </a>
              </SidebarGroupLabel>
              <SidebarGroupContent className="mt-3">
                <SidebarMenu className="flex flex-col gap-3">
                  {items.map((item) => (
                    <SidebarMenuItem className="h-15" key={item.title}>
                      <SidebarMenuButton className="h-full" asChild onClick={() => setSelectedTab(item.title)}>
                        <a
                          href="#"
                          className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                            selectedTab === item.title
                              ? "bg-gray-700 text-white"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <img
                          src={item.icon}
                          alt={item.title}
                          className="w-10 h-10" 
                        />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 p-6 min-h-screen overflow-auto bg-gray-100 dark:bg-gray-900">
          <div className="flex justify-between items-center">
            <SidebarTrigger />
            <button
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-gray-500" />
              )}
            </button>
          </div>
          <div className="h-full mt-6">
            {selectedTab === "Dashboard" && <DashboardData />}
            {selectedTab === "Create Resource" && <CreateResource/>}
            {selectedTab === "Resource" && <ResourceList/>}
            {selectedTab === "Settings" && <SettingPage/>}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
