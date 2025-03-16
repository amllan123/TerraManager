import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  { name: "VPC", icon: "/assets/aws-vpc.png", description: "Create a Virtual Private Cloud" },
  { name: "EC2", icon: "/assets/aws-ec2.png", description: "Launch an EC2 Instance" },
  { name: "RDS", icon: "/assets/aws-rds.png", description: "Deploy an RDS Database" },
  { name: "EKS", icon: "/assets/aws-eks.png", description: "Provision an EKS Cluster" },
  { name: "S3", icon: "/assets/aws-s3.png", description: "Create an S3 Bucket" },
  { name: "ECR", icon: "/assets/aws-ecr.png", description: "Create an ECR Repository" },
  { name: "Lambda", icon: "/assets/aws-lambda.png", description: "Deploy a Lambda Function" },
  

];

const CreateResource = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Create Resources</h2>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center justify-between"
          >
            <img src={resource.icon} alt={resource.name} className="w-14 h-14 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{resource.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {resource.description}
            </p>
            <Button className="mt-3 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
              <Plus size={16} />
              <span>Create</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateResource;
