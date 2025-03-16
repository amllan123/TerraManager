require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const { exec } = require("child_process");

const app = express();
const VpcRoute=require('./routes/vpc')
app.use(express.json());






const WORKSPACE_DIR = path.join(__dirname, "workspaces");
const TF_MODULES_DIR = path.join(__dirname, "terraform_modules");
const S3_BUCKET_NAME = "terraform-projects-amllan"; // Replace with actual S3 bucket
const AWS_REGION = "ap-south-1";

// Routes API 
app.use("/api/vpc", VpcRoute(WORKSPACE_DIR, TF_MODULES_DIR));


app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/create", async (req, res) => {
  let logs = [];
  try {
    const userId = "user123"; // Dynamically set user ID
    const awsProfile = userId;
    const userWorkspace = path.join(WORKSPACE_DIR, userId);

    if (!fs.existsSync(WORKSPACE_DIR)) fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
    if (!fs.existsSync(userWorkspace)) fs.mkdirSync(userWorkspace, { recursive: true });

    fse.copySync(TF_MODULES_DIR, userWorkspace);

    const awsConfigCmd = `
      aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID" --profile ${awsProfile} &&
      aws configure set aws_secret_access_key "$AWS_ACCESS_KEY_ID" --profile ${awsProfile} &&
      aws configure set region "${AWS_REGION}" --profile ${awsProfile}
    `;
    logs.push(await runCommand(awsConfigCmd));

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

    const tfVarsContent = `
aws_profile = "${awsProfile}"
aws_region = "${AWS_REGION}"
project_name = "${userId}"
aws_s3_bucket = "${S3_BUCKET_NAME}"
`;
    fs.writeFileSync(path.join(userWorkspace, "terraform.tfvars"), tfVarsContent);

    logs.push(await runCommand("terraform init", userWorkspace));
    logs.push(await runCommand("terraform plan", userWorkspace)); // Added Terraform Plan
    logs.push(await runCommand("terraform apply -auto-approve", userWorkspace));

    fse.removeSync(userWorkspace);
    console.log("Infrastructure created successfully!");
    res.json({
      message: "Infrastructure created successfully!",
      logs: logs.join("\n"),
    });
  } catch (error) {
    res.status(500).json({ error: error.message, logs: logs.join("\n") });
  }
});

app.post("/destroy", async (req, res) => {
  let logs = [];
  try {
    const userId = "user123"; // Dynamically set user ID
    const awsProfile = userId;
    const userWorkspace = path.join(WORKSPACE_DIR, `${userId}-destroy`);

    if (!fs.existsSync(WORKSPACE_DIR)) fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
    if (!fs.existsSync(userWorkspace)) fs.mkdirSync(userWorkspace, { recursive: true });

    fse.copySync(TF_MODULES_DIR, userWorkspace);

    const awsConfigCmd = `
      aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID" --profile ${awsProfile} &&
      aws configure set aws_secret_access_key "$AWS_ACCESS_KEY_ID" --profile ${awsProfile} &&
      aws configure set region "${AWS_REGION}" --profile ${awsProfile}
    `;
    logs.push(await runCommand(awsConfigCmd));

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

    const tfVarsContent = `
aws_profile = "${awsProfile}"
aws_region = "${AWS_REGION}"
project_name = "${userId}"
aws_s3_bucket = "${S3_BUCKET_NAME}"
`;
    fs.writeFileSync(path.join(userWorkspace, "terraform.tfvars"), tfVarsContent);

    logs.push(await runCommand("terraform init", userWorkspace));
    logs.push(await runCommand("terraform destroy -auto-approve", userWorkspace));

    fse.removeSync(userWorkspace);
    console.log("Infrastructure deleted successfully!");
    res.json({
      message: "Infrastructure destroyed successfully!",
      logs: logs.join("\n"),
    });
  } catch (error) {
    res.status(500).json({ error: error.message, logs: logs.join("\n") });
  }
});

function runCommand(command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        resolve(`Error executing: ${command}\n${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

app.listen(3000, () => console.log("Server running on port 3000"));
