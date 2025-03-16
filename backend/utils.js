const { exec } = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');


function runCommand(command, workingDir, env = {}) {
    return new Promise((resolve, reject) => {
        exec(command, {
            cwd: workingDir,
            env: {
                ...process.env,  // Preserve existing environment variables
                PATH: process.env.PATH + ':/opt/homebrew/bin',  // Add Terraform's path
                ...env
            }
        }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}`, error);
                reject(error);
            } else {
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolve(stdout);
            }
        });
    });
}

module.exports = { runCommand };


const s3 = new AWS.S3();

const uploadToS3 = async (workspace, bucketName) => {
    const stateFile = path.join(workspace, "terraform.tfstate");
    const fileContent = fs.readFileSync(stateFile);
    
    await s3.putObject({
        Bucket: bucketName,
        Key: "terraform.tfstate",
        Body: fileContent
    }).promise();
};

const downloadFromS3 = async (workspace, bucketName) => {
    const stateFile = path.join(workspace, "terraform.tfstate");
    
    const data = await s3.getObject({ Bucket: bucketName, Key: "terraform.tfstate" }).promise();
    fs.writeFileSync(stateFile, data.Body);
};

module.exports = { runCommand, uploadToS3, downloadFromS3 };
