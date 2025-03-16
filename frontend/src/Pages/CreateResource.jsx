import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VPC_Form from "../forms/VPC_FORM";
import EC2_Form from "../forms/EC2_Form";
import { useTheme } from "next-themes"; // Import theme hook

const resources = [
  { name: "VPC", icon: "/assets/aws-vpc.png", description: "Create a Virtual Private Cloud", form: VPC_Form },
  { name: "EC2", icon: "/assets/aws-ec2.png", description: "Launch an EC2 Instance", form: EC2_Form },
  { name: "RDS", icon: "/assets/aws-rds.png", description: "Deploy an RDS Database", form: null },
  { name: "EKS", icon: "/assets/aws-eks.png", description: "Provision an EKS Cluster", form: null },
  { name: "S3", icon: "/assets/aws-s3.png", description: "Create an S3 Bucket", form: null },
  { name: "ECR", icon: "/assets/aws-ecr.png", description: "Create an ECR Repository", form: null },
  { name: "Lambda", icon: "/assets/aws-lambda.png", description: "Deploy a Lambda Function", form: null },
];

const CreateResource = () => {
  const { theme } = useTheme(); // Get current theme
  const [open, setOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleOpen = (resource) => {
    if (resource.form) {
      setSelectedResource(resource);
      setOpen(true);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Resources</h2>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center justify-between"
          >
            <img src={resource.icon} alt={resource.name} className="w-14 h-14 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400 text-center">
              {resource.description}
            </p>

            <Dialog open={open && selectedResource?.name === resource.name} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => handleOpen(resource)}
                  className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-md 
                    ${resource.form 
                      ? "bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white" 
                      : "bg-gray-400 text-white cursor-not-allowed"}
                  `}
                  disabled={!resource.form}
                >
                  <Plus size={16} />
                  <span>Create</span>
                </Button>
              </DialogTrigger>
              {selectedResource?.name === resource.name && resource.form && (
                <DialogContent className="bg-white dark:bg-gray-900 dark:text-white rounded-md">
                  <DialogHeader>
                    <DialogTitle>Create {resource.name}</DialogTitle>
                  </DialogHeader>
                  <selectedResource.form onClose={() => setOpen(false)} />
                </DialogContent>
              )}
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateResource;
