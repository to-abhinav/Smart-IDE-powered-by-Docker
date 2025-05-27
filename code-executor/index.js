const express = require("express");
const bodyParser = require("body-parser");
const { spawn, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.text());

const PORT = 8000;
const CODE_DIR = path.resolve(__dirname, "./docker/cpp");

if (!fs.existsSync(CODE_DIR)) {
  fs.mkdirSync(CODE_DIR, { recursive: true });
}


const runDockerWithStdin = (imageName, code, res) => {
  const docker = spawn("docker", ["run", "-i", "--rm", imageName]);

  let output = "";
  let error = "";

  docker.stdout.on("data", (data) => (output += data.toString()));
  docker.stderr.on("data", (data) => (error += data.toString()));

  docker.on("close", (code) => {
    res.status(code === 0 ? 200 : 400).json({
      output: output.trim(),
      error: error.trim(),
    });
  });

  docker.stdin.write(code);
  docker.stdin.end();
};

const runDockerWithVolume = (volumeDir, imageName, res) => {
  const dockerCmd = `docker run --rm -v "${volumeDir}:/app" ${imageName}`;

  exec(dockerCmd, { timeout: 5000 }, (err, stdout, stderr) => {
    res.status(err ? 400 : 200).json({
      output: (stdout || "").trim(),
      error: (stderr || err?.message || "").trim(),
    });
  });
};

app.post("/run/python", (req, res) => {
  const code = req.body;
  if (!code) return res.status(400).json({ error: "Python code is required" });

  console.log("Running Python code...");
  runDockerWithStdin("code-runner-python", code, res);
});

app.post("/run/cpp", (req, res) => {
  const code = req.body;
  if (!code) return res.status(400).json({ error: "C++ code is required" });

  const filePath = path.join(CODE_DIR, "code.cpp");
  fs.writeFileSync(filePath, code);

  console.log("Running C++ code...");
  runDockerWithVolume(CODE_DIR, "cpp-runner", res);
});

app.post("/run/javascript", (req, res) => {
  const code = req.body;
  if (!code) return res.status(400).json({ error: "JavaScript code is required" });

  console.log("Running JavaScript code...");
  runDockerWithStdin("javascript-runner", code, res);
});

app.post("/run/java", (req, res) => {
  const code = req.body;
  if (!code) return res.status(400).json({ error: "Java code is required" });

  console.log("Running Java code...");
  runDockerWithStdin("java-runner", code, res);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
