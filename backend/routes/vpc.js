const express = require("express");
const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const { exec } = require("child_process");

module.exports = (WORKSPACE_DIR, TF_MODULES_DIR) => {
  const router = express.Router();

  // 🚀 CREATE INFRASTRUCTURE
  router.post("/create", async (req, res) => {
    const startTime = new Date();
    logInfo("Received request to create infrastructure.");

    try {
      const {
        project_name,
        userId,
        vpc_cidr,
        public_subnet_cidrs,
        private_subnet_cidrs,
        availability_zones,
        AWS_REGION,
        S3_BUCKET_NAME,
        AWS_ACCESS_KEY,
        AWS_SECRET_KEY,
        create_vpc_only
      } = req.body;

      logDebug("Extracted request body:", req.body);

      if (!project_name || !userId || !AWS_REGION || !S3_BUCKET_NAME) {
        throw new Error("Missing required fields in request body.");
      }

      const awsProfile = userId;
      const userWorkspace = path.join(WORKSPACE_DIR, userId, project_name);

      // Ensure workspace directories exist
      if (!fs.existsSync(WORKSPACE_DIR)) fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
      if (!fs.existsSync(userWorkspace)) fs.mkdirSync(userWorkspace, { recursive: true });

      logInfo(`User workspace created at ${userWorkspace}`);

      // Copy Terraform modules
      fse.copySync(TF_MODULES_DIR, userWorkspace);
      logInfo("Terraform module copied successfully.");

      // Configure AWS CLI
      const awsConfigCmd = `
        aws configure set aws_access_key_id ${AWS_ACCESS_KEY} --profile ${awsProfile} &&
        aws configure set aws_secret_access_key ${AWS_SECRET_KEY} --profile ${awsProfile} &&
        aws configure set region "${AWS_REGION}" --profile ${awsProfile}
      `;
      await runCommand(awsConfigCmd);
      logInfo("AWS CLI configured successfully.");

      // Generate backend configuration file
      const backendConfig = {
        terraform: {
          backend: {
            s3: {
              bucket: S3_BUCKET_NAME,
              key: `${userId}/terraform.tfstate`,
              region: AWS_REGION,
              encrypt: true,
            },
          },
        },
      };
      fs.writeFileSync(path.join(userWorkspace, "backend.tf.json"), JSON.stringify(backendConfig, null, 2));
      logInfo("Terraform backend configuration written successfully.");

      // Generate terraform.tfvars
      const tfVarsContent = `
      aws_profile = "${awsProfile}"
      aws_region = "${AWS_REGION}"
      project_name = "${project_name}"
      aws_s3_bucket = "${S3_BUCKET_NAME}"
      vpc_cidr="${vpc_cidr}"
      public_subnet_cidrs=${JSON.stringify(public_subnet_cidrs)}
      private_subnet_cidrs=${JSON.stringify(private_subnet_cidrs)}
      availability_zones=${JSON.stringify(availability_zones)}
      create_vpc_only="${create_vpc_only}"
      `;
      fs.writeFileSync(path.join(userWorkspace, "terraform.tfvars"), tfVarsContent);
      logInfo("Terraform variable file created successfully.");

      // Execute Terraform commands
      await runCommand("terraform init", userWorkspace);
      logInfo("Terraform initialized successfully.");
      
      await runCommand("terraform plan", userWorkspace);
      logInfo("Terraform plan executed successfully.");

      await runCommand("terraform apply -auto-approve", userWorkspace);
      logInfo("Terraform apply executed successfully.");

      // Send success response
      const endTime = new Date();
      logInfo(`Infrastructure created successfully in ${(endTime - startTime) / 1000} seconds.`);
      fse.removeSync(userWorkspace);
      res.status(200).json({ message: "Infrastructure created successfully" });

    } catch (error) {
      logError("Error occurred during infrastructure creation", error);

      // Ensure only one response is sent
      if (!res.headersSent) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
      }
    }
  });








  // 🔥 DESTROY INFRASTRUCTURE
  router.post("/destroy", async (req, res) => {
    const startTime = new Date();
    logInfo("Received request to destroy infrastructure.");

    try {
      const {
        project_name,
        userId,
        vpc_cidr,
        public_subnet_cidrs,
        private_subnet_cidrs,
        availability_zones,
        AWS_REGION,
        S3_BUCKET_NAME,
        AWS_ACCESS_KEY,
        AWS_SECRET_KEY,
        create_vpc_only
      } = req.body;

      if (!project_name || !userId || !AWS_REGION) {
        throw new Error("Missing required fields in request body.");
      }

      const awsProfile = userId;
      const userWorkspace = path.join(WORKSPACE_DIR, userId, project_name);

      if (!fs.existsSync(WORKSPACE_DIR)) fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
      if (!fs.existsSync(userWorkspace)) fs.mkdirSync(userWorkspace, { recursive: true });
  
      fse.copySync(TF_MODULES_DIR, userWorkspace);
  

      logInfo(`Destroying Terraform infrastructure in workspace: ${userWorkspace}`);

      // Configure AWS CLI (again, to ensure credentials are set)
      const awsConfigCmd = `
        aws configure set aws_access_key_id ${AWS_ACCESS_KEY} --profile ${awsProfile} &&
        aws configure set aws_secret_access_key ${AWS_SECRET_KEY} --profile ${awsProfile} &&
        aws configure set region "${AWS_REGION}" --profile ${awsProfile}
      `;
      await runCommand(awsConfigCmd);
      logInfo("AWS CLI configured successfully.");
      const backendConfig = {
        terraform: {
          backend: {
            s3: {
              bucket: S3_BUCKET_NAME,
              key: `${userId}/terraform.tfstate`,
              region: AWS_REGION,
              encrypt: true,
            },
          },
        },
      };
      fs.writeFileSync(path.join(userWorkspace, "backend.tf.json"), JSON.stringify(backendConfig, null, 2));
      logInfo("Terraform backend configuration written successfully.");

      // Generate terraform.tfvars
      const tfVarsContent = `
      aws_profile = "${awsProfile}"
      aws_region = "${AWS_REGION}"
      project_name = "${project_name}"
      aws_s3_bucket = "${S3_BUCKET_NAME}"
      vpc_cidr="${vpc_cidr}"
      public_subnet_cidrs=${JSON.stringify(public_subnet_cidrs)}
      private_subnet_cidrs=${JSON.stringify(private_subnet_cidrs)}
      availability_zones=${JSON.stringify(availability_zones)}
      create_vpc_only="${create_vpc_only}"
      `;
      fs.writeFileSync(path.join(userWorkspace, "terraform.tfvars"), tfVarsContent);
      logInfo("Terraform variable file created successfully.");

      // Run Terraform destroy command
      await runCommand("terraform init", userWorkspace);
      logInfo("Terraform init executed successfully.");
      await runCommand("terraform destroy -auto-approve", userWorkspace);
      logInfo("Terraform destroy executed successfully.");

      // Delete workspace directory
      fse.removeSync(userWorkspace);
      logInfo(`Workspace deleted successfully: ${userWorkspace}`);

      // Send success response
      const endTime = new Date();
      logInfo(`Infrastructure destroyed successfully in ${(endTime - startTime) / 1000} seconds.`);
      res.status(200).json({ message: "Infrastructure destroyed successfully" });

    } catch (error) {
      logError("Error occurred during infrastructure destruction", error);

      // Ensure only one response is sent
      if (!res.headersSent) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
      }
    }
  });



  
  function runCommand(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
      logInfo(`Executing command: ${command} in ${cwd}`);
      exec(command, { cwd }, (error, stdout, stderr) => {
        if (error) {
          logError(`Command failed: ${command}`, error);
          logError(stderr);
          return reject(error);
        }
        logDebug(`Command output: ${stdout}`);
        resolve(stdout);
      });
    });
  }

  function logInfo(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  function logError(message, error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (error) console.error(error.stack || error);
  }

  function logDebug(message, data = null) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    if (data) console.debug(JSON.stringify(data, null, 2));
  }

  return router;
};
