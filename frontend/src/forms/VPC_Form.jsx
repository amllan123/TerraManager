import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Define validation schema
const vpcSchema = z
  .object({
    project_name: z
      .string()
      .min(2, "Project name must be at least 2 characters"),
    vpc_cidr: z
      .string()
      .regex(/^(\d{1,3}\.){3}\d{1,3}\/\d+$/, "Invalid CIDR format"),
    public_subnet_cidrs: z
      .array(
        z.string().regex(/^(\d{1,3}\.){3}\d{1,3}\/\d+$/, "Invalid CIDR format")
      )
      .min(1, "At least one public subnet is required"),
    private_subnet_cidrs: z
      .array(
        z.string().regex(/^(\d{1,3}\.){3}\d{1,3}\/\d+$/, "Invalid CIDR format")
      )
      .min(1, "At least one private subnet is required"),
    availability_zones: z
      .array(z.string())
      .min(1, "Select at least one availability zone"),
    AWS_REGION: z.string().min(1, "AWS region is required"),
    S3_BUCKET_NAME: z
      .string()
      .min(3, "S3 Bucket name must be at least 3 characters"),
  })
  .refine(
    (data) => data.public_subnet_cidrs.length <= data.availability_zones.length,
    {
      message: "Public subnet count must be ≤ Availability Zones count",
      path: ["public_subnet_cidrs"],
    }
  )
  .refine(
    (data) =>
      data.private_subnet_cidrs.length <= data.availability_zones.length,
    {
      message: "Private subnet count must be ≤ Availability Zones count",
      path: ["private_subnet_cidrs"],
    }
  );

// Mapping AWS Regions to their Availability Zones
const regionToAZs = {
  "ap-south-1": ["ap-south-1a", "ap-south-1b", "ap-south-1c"],
  "us-east-1": ["us-east-1a", "us-east-1b", "us-east-1c", "us-east-1d"],
  "us-west-2": ["us-west-2a", "us-west-2b", "us-west-2c"],
};

const awsRegionsOptions = Object.keys(regionToAZs).map((region) => ({
  value: region,
  label: region,
}));

const VPC_Form = ({ onClose }) => {
  const { theme } = useTheme(); // Get the current theme
  const [availableAZs, setAvailableAZs] = useState([]);

  const form = useForm({
    resolver: zodResolver(vpcSchema),
    defaultValues: {
      project_name: "",
      vpc_cidr: "",
      public_subnet_cidrs: [""],
      private_subnet_cidrs: [""],
      availability_zones: [],
      AWS_REGION: "",
      S3_BUCKET_NAME: "",
    },
  });

  const selectedRegion = form.watch("AWS_REGION");

  useEffect(() => {
    // Update available AZs when the region changes
    if (selectedRegion) {
      setAvailableAZs(regionToAZs[selectedRegion] || []);
      form.setValue("availability_zones", []); // Reset AZs when region changes
    }
  }, [selectedRegion, form]);

  const onSubmit = (values) => {
    console.log("VPC Data:", values);
    onClose(); // Close dialog on success
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: theme === "dark" ? "#1E1E1E" : "white",
      borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
      color: theme === "dark" ? "white" : "black",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: theme === "dark" ? "white" : "black",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: theme === "dark" ? "#1E1E1E" : "white",
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused
        ? theme === "dark"
          ? "#374151"
          : "#E5E7EB"
        : "transparent",
      color: theme === "dark" ? "white" : "black",
    }),
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-md shadow-md"
      >
        {/* Project Name */}
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">Project Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="demo"
                  {...field}
                  className="dark:bg-gray-800 dark:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AWS Region */}
        <FormField
          control={form.control}
          name="AWS_REGION"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">AWS Region</FormLabel>
              <FormControl>
                <Select
                  options={awsRegionsOptions}
                  value={awsRegionsOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption.value)
                  }
                  styles={customSelectStyles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Availability Zones */}
        <FormField
          control={form.control}
          name="availability_zones"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">
                Availability Zones
              </FormLabel>
              <FormControl>
                <Select
                  isMulti
                  options={availableAZs.map((az) => ({ value: az, label: az }))}
                  value={availableAZs
                    .filter((az) => field.value.includes(az))
                    .map((az) => ({ value: az, label: az }))}
                  onChange={(selectedOptions) =>
                    field.onChange(
                      selectedOptions.map((option) => option.value)
                    )
                  }
                  styles={customSelectStyles}
                  isDisabled={!selectedRegion}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VPC CIDR */}
        <FormField
          control={form.control}
          name="vpc_cidr"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">VPC CIDR</FormLabel>
              <FormControl>
                <Input
                  placeholder="10.0.0.0/18"
                  {...field}
                  className="dark:bg-gray-800 dark:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Public Subnets */}
        <FormField
          control={form.control}
          name="public_subnet_cidrs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">
                Public Subnet CIDRs
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="10.0.1.0/24, 10.0.2.0/24"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(e.target.value.split(", ").filter(Boolean))
                  }
                  className="dark:bg-gray-800 dark:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ✅ Private Subnets (Newly Added) */}
        <FormField
          control={form.control}
          name="private_subnet_cidrs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">
                Private Subnet CIDRs
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="10.0.3.0/24, 10.0.4.0/24"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(e.target.value.split(", ").filter(Boolean))
                  }
                  className="dark:bg-gray-800 dark:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* S3 Bucket Name */}
        <FormField
          control={form.control}
          name="S3_BUCKET_NAME"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">S3 Bucket Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="my-s3-bucket"
                  {...field}
                  className="dark:bg-gray-800 dark:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full dark:bg-gray-700 dark:text-white"
        >
          Create VPC
        </Button>
      </form>
    </Form>
  );
};

export default VPC_Form;
