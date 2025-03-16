import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Play, Pause, Trash2 } from "lucide-react";

const initialResources = [
  {
    id: 1,
    project: "My AWS Project",
    name: "VPC",
    cloudComponent: "AWS VPC",
    type: "Networking",
    region: "us-east-1",
    status: "Active",
    createdAt: "2024-03-10",
    icon: "/assets/aws-vpc.png",
  },
  {
    id: 2,
    project: "E-Commerce App",
    name: "EC2 Instance",
    cloudComponent: "AWS EC2",
    type: "Compute",
    region: "us-west-2",
    status: "Running",
    createdAt: "2024-03-12",
    icon: "/assets/aws-ec2.png",
  },
  {
    id: 3,
    project: "Data Analytics",
    name: "RDS Database",
    cloudComponent: "AWS RDS",
    type: "Database",
    region: "ap-south-1",
    status: "Stopped",
    createdAt: "2024-03-08",
    icon: "/assets/aws-rds.png",
  },
  {
    id: 4,
    project: "Kubernetes Cluster",
    name: "EKS Cluster",
    cloudComponent: "AWS EKS",
    type: "Kubernetes",
    region: "us-east-2",
    status: "Active",
    createdAt: "2024-03-11",
    icon: "/assets/aws-eks.png",
  },
];

const statusColors = {
  Running: "text-green-600 bg-green-100",
  Active: "text-blue-600 bg-blue-100",
  Stopped: "text-red-600 bg-red-100",
};

const ResourceList = () => {
  const [resources, setResources] = useState(initialResources);

  // Toggle status between Running and Stopped
  const toggleStatus = (id) => {
    setResources((prevResources) =>
      prevResources.map((res) =>
        res.id === id
          ? { ...res, status: res.status === "Running" ? "Stopped" : "Running" }
          : res
      )
    );
  };

  // Delete resource
  const deleteResource = (id) => {
    setResources((prevResources) => prevResources.filter((res) => res.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col p-6 rounded-lg bg-white dark:bg-gray-900 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Existing Infrastructure</h2>

      {/* Resource Grid */}
      <div className="flex-grow mt-5 overflow-auto">
        {resources.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No resources created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-5 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg flex flex-col h-full"
              >
                {/* Resource Details */}
                <div className="flex items-center gap-3">
                  <img src={resource.icon} alt={resource.name} className="w-12 h-12" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {resource.cloudComponent} | {resource.type}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Project: <span className="font-medium">{resource.project}</span>
                    </p>
                  </div>
                </div>

                {/* Extra Info */}
                <div className="mt-3 flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Region: <span className="font-semibold">{resource.region}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <Clock size={14} className="text-gray-500" /> Created:{" "}
                    <span className="font-semibold">{resource.createdAt}</span>
                  </p>
                  <span
                    className={`mt-2 inline-block text-sm font-medium px-3 py-1 rounded-full ${statusColors[resource.status]}`}
                  >
                    {resource.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  {resource.status === "Running" ? (
                    <button
                      className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-md flex items-center gap-2 hover:bg-yellow-600"
                      onClick={() => toggleStatus(resource.id)}
                    >
                      <Pause size={16} /> Stop
                    </button>
                  ) : (
                    <button
                      className="text-sm px-3 py-1 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
                      onClick={() => toggleStatus(resource.id)}
                    >
                      <Play size={16} /> Resume
                    </button>
                  )}

                  <button
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded-md flex items-center gap-2 hover:bg-red-600"
                    onClick={() => deleteResource(resource.id)}
                  >
                    <Trash2 size={16} /> Destroy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
