# 🐞 Debugged - StackOverflow Clone

**Debugged** is a full-stack StackOverflow-style Q&A platform for developers to ask questions, share answers, and upvote helpful solutions — all in real time. Designed to help you debug code, learn from peers, and build community around problem-solving.

> 💡 Built with a focus on clean UI and a powerful developer experience.

---

## 🚀 Features

- 🧵 Post programming questions with code support
- 💬 Answer and discuss with others in threaded replies
- ⬆️ Upvote or downvote answers based on helpfulness
- 🔍 Search questions using keywords or tags
- 🧑‍💻 Authentication via Clerk
- 🧠 Modern, minimal UI built with ShadCN and TailwindCSS
- 🗂️ Organized by tags, topics, and popularity

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, ShadCN UI
- **State Management:** Zustand (with Immer and Persist)
- **Authentication:** Clerk
- **Backend:** Appwrite (Database + Functions)
- **Deployment:** Vercel

---


## 📦 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/debugged.git
cd debugged
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup .env.local**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_url
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
```

4. **Run the app**

```bash
npm run dev
```

---

## 🙌 Contributing

Pull requests are welcome! If you find a bug or want to add features, feel free to fork the repo and open a PR.

---

## 📫 Contact

Made by [Rohit](https://github.com/rohicod3). Feel free to reach out or open issues!

---

## 🌐 Live Demo

[https://debugged.vercel.app](https://debugged.vercel.app)  
_Explore the project live._

---

## 📄 License

This project is licensed under the MIT License.
