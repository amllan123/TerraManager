import React, { useState } from "react";

const awsRegions = [
  { code: "us-east-1", name: "US East (N. Virginia)" },
  { code: "us-west-2", name: "US West (Oregon)" },
  { code: "eu-central-1", name: "EU (Frankfurt)" },
  { code: "ap-south-1", name: "Asia Pacific (Mumbai)" },
];

const instanceTypes = ["t2.micro", "t3.small", "t3.medium", "m5.large"];

const SettingPage = () => {
  const [settings, setSettings] = useState({
    awsAccessKey: "",
    awsSecretKey: "",
    preferredRegion: "us-east-1",
    enableMFA: false,
    defaultInstanceType: "t2.micro",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    console.log("Saved settings:", settings);
  };

  const handleReset = () => {
    setSettings({
      awsAccessKey: "",
      awsSecretKey: "",
      preferredRegion: "us-east-1",
      enableMFA: false,
      defaultInstanceType: "t2.micro",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">AWS Settings</h2>

      <div className="mt-5 max-w-lg bg-gray-50 dark:bg-gray-800 shadow-md p-6 rounded-lg">
        {/* AWS Access Key */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            AWS Access Key
          </label>
          <input
            type="text"
            name="awsAccessKey"
            value={settings.awsAccessKey}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter AWS Access Key"
          />
        </div>

        {/* AWS Secret Key */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            AWS Secret Key
          </label>
          <input
            type="password"
            name="awsSecretKey"
            value={settings.awsSecretKey}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter AWS Secret Key"
          />
        </div>

        {/* Preferred AWS Region */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Preferred AWS Region
          </label>
          <select
            name="preferredRegion"
            value={settings.preferredRegion}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          >
            {awsRegions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Default EC2 Instance Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Default EC2 Instance Type
          </label>
          <select
            name="defaultInstanceType"
            value={settings.defaultInstanceType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          >
            {instanceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Enable MFA */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="enableMFA"
            checked={settings.enableMFA}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700 dark:text-white">Enable Multi-Factor Authentication (MFA)</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSave}
          >
            Save Settings
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
