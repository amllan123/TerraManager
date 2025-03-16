import React from "react";
import Lottie from "lottie-react";
import dashboard from "../../public/assets/dashboard.json";
import { FileMinus, FilePen, FilePlus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardData = () => {
  const recentActivities = [
    {
      id: 1,
      action: "Created",
      resource: "VPC",
      timestamp: "March 15, 2025, 10:30 AM",
      status: "created",
    },
    {
      id: 2,
      action: "Modified",
      resource: "EC2 Instance",
      timestamp: "March 15, 2025, 11:00 AM",
      status: "modified",
    },
    {
      id: 3,
      action: "Deleted",
      resource: "RDS Database",
      timestamp: "March 15, 2025, 12:15 PM",
      status: "deleted",
    },
  ];
  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow-sm rounded-lg h-full ">
      <div>
        <span className="font-semibold text-2xl text-gray-800 dark:text-white">
          Dashboard
        </span>
      </div>

      {/* Search & Button Section */}
      <div className="flex items-center gap-4 mt-4">
        {/* Search Bar */}
        <div className="flex flex-1 items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
          <Search className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="bg-transparent ml-2 outline-none flex-1 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          <Plus />
          <span>Create New</span>
        </Button>
      </div>

      {/* Dashboard Data List  */}
      <div className="mt-5">
        <div className="flex flex-wrap justify-between gap-5">
          {/* VPC Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg flex items-center justify-between w-[calc(25%-1.25rem)] min-w-[250px]">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aws-vpc.png"
                alt="AWS VPC"
                className="w-10 h-10"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                VPC
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              5
            </span>
          </div>

          {/* EC2 Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg flex items-center justify-between w-[calc(25%-1.25rem)] min-w-[250px]">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aws-ec2.png"
                alt="AWS EC2"
                className="w-10 h-10"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                EC2
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              12
            </span>
          </div>

          {/* RDS Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg flex items-center justify-between w-[calc(25%-1.25rem)] min-w-[250px]">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aws-rds.png"
                alt="AWS RDS"
                className="w-10 h-10"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                RDS
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              3
            </span>
          </div>

          {/* EKS Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg flex items-center justify-between w-[calc(25%-1.25rem)] min-w-[250px]">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aws-eks.png"
                alt="AWS EKS"
                className="w-10 h-10"
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                EKS
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              2
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activities
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                {activity.status === "created" && <FilePlus className="text-green-500" />}
                {activity.status === "modified" && <FilePen className="text-yellow-500" />}
                {activity.status === "deleted" && <FileMinus className="text-red-500" />}
                
                {/* Activity Details */}
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {activity.action} {activity.resource}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  activity.status === "created"
                    ? "bg-green-100 text-green-600"
                    : activity.status === "modified"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {activity.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
