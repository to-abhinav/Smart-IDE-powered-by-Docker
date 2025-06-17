# 🧠 LogicalLab — Your Smart Online IDE

![LogicalLab](https://img.shields.io/badge/LogicalLab-Smart_Online_IDE-blueviolet?style=for-the-badge\&logo=codewars\&logoColor=white)

> **Build. Run. Share.** Code smartly in containers.

LogicalLab is a modern **online IDE** built with **Next.js**, enabling **secure, local Docker-based code execution** for multiple languages—**without relying on third-party APIs**.

---

## 🚀 Tech Stack

| Tool                                                                                         | Purpose                    |
| -------------------------------------------------------------------------------------------- | -------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js\&style=flat-square)    | Fullstack Framework        |
| ![Docker](https://img.shields.io/badge/Docker-Execution-blue?logo=docker\&style=flat-square) | Code Execution Environment |
| ![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js\&style=flat-square)   | Backend Server             |
| ![Convex](https://img.shields.io/badge/Convex-Database-orange?style=flat-square)             | Serverless Database        |
| ![Clerk](https://img.shields.io/badge/Auth-Clerk-ff69b4?style=flat-square)                   | Authentication             |
| ![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-blue?style=flat-square)      | Styling Framework          |

---

## ✨ Features

* 🐳 **Local Docker-Based Code Execution** (C++, Java, Python, JavaScript)
* 🧠 VSCode-like Smart Editor
* 🔐 Clerk Authentication
* 📤 Shareable Code Snippets with History
* 📈 Language Usage Analytics
* ⚙️ Customizable Editor Settings (Themes, Fonts)

---

## 🗂️ Folder Structure

```
📁code-executor
├── 📁docker/               # Docker setups per language
│   ├── 📁cpp/
│   ├── 📁java/
│   ├── 📁javascript/
│   └── 📁python/
├── 📁dockercode-run/       # Execution inputs & outputs
├── 📁temp/                 # Temporary user files
├── code.cpp                # Sample file
├── index.js                # Backend executor entry point
├── package.json
└── package-lock.json
```

---

## 🛠️ Getting Started

### 🔃 Prerequisites

* [Node.js](https://nodejs.org/en/) `v18+`
* [Docker](https://www.docker.com/) installed and running
* [Convex](https://www.convex.dev/) account
* [Clerk](https://clerk.com/) account

### 📥 Installation

```bash
git clone https://github.com/to-abhinav/logical-lab.git](https://github.com/to-abhinav/Smart-IDE-powered-by-Docker.git
cd Smart-IDE-powered-by-Docker
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
CONVEX_DEPLOYMENT=your_url
CLERK_WEBHOOK_SECRET=your_key
LEMON_SQUEEZY_WEBHOOK_SECRET=your_key
NEXT_PUBLIC_CONVEX_URL=your_url
```

---

## 🧪 Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Running Docker Code Executor (Manually)

You can test language runners individually for development:

### ▶️ C++

```bash
cd code-executor/docker/cpp
docker build -t logical-cpp .
docker run --rm -v $(pwd):/app logical-cpp
```

### ▶️ Python

```bash
cd code-executor/docker/python
docker build -t logical-python .
docker run --rm -v $(pwd):/app logical-python
```

### ▶️ Java

```bash
cd code-executor/docker/java
docker build -t logical-java .
docker run --rm -v $(pwd):/app logical-java
```

### ▶️ JavaScript

```bash
cd code-executor/docker/javascript
docker build -t logical-js .
docker run --rm -v $(pwd):/app logical-js
```

---

## 🟢 Run Node.js Docker Server (Code Execution)

To start the Docker-based backend runner:

```bash
cd code-executor
node index.js
```

> This server handles Docker execution requests from the frontend.

---

## 📦 Adding New Language Support

1. Create `code-executor/docker/<your_language>/`
2. Add:

   * `Dockerfile`
   * `runner.sh` or `runner.py`
3. Update `index.js` to support the new language and Docker image.

---


### 🧱 Is it safe?

Yes. Each language runs in a **separate container** with no access to host resources or internet.

---

## 💬 Contact

[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-blue?logo=linkedin\&style=flat-square)](https://www.linkedin.com/in/to-abhinav/)
🛠 For issues, create an [Issue](https://github.com/to-abhinav/Smart-IDE-powered-by-Docker/issues) or submit a [Pull Request](https://github.com/to-abhinav/Smart-IDE-powered-by-Docker/pulls)

---

## 📜 License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

🧠 **LogicalLab** — *Code smart. Code safe. Code anywhere.*


