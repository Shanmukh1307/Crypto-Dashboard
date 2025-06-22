# 💹 Crypto Currency Price & Market Tracker Web App

This project is a **real-time cryptocurrency analytics dashboard** that provides users with up-to-date data about various cryptocurrencies, including:

- ✅ Current market prices
- ✅ Trading volume and market cap
- ✅ Historical price charts
- ✅ Latest crypto-related news
- ✅ Detailed coin-specific data
- ✅ External resource links (whitepapers, websites, social)

The application is fully responsive, uses real APIs, and dynamically updates based on user interaction, providing a seamless user experience.

---

## 🛠️ Tech Stack & Tools Used

- ⚛️ **React.js** — core framework
- ⚡ **Vite** — fast development server
- 🎨 **Ant Design** — UI components & layout
- 📦 **Redux Toolkit & RTK Query** — API handling and state management
- 📰 **RapidAPI** — for Crypto News and Market Data (CoinRanking, Bing News APIs)
- 📈 **Recharts** — line chart visualization
- 🧠 **html-react-parser** — for parsing rich HTML content
- 💻 **VS Code** — code editor

---

## 🔑 Key Features Implemented

- 🔍 Search & select dropdown for filtering coins and news
- 📈 Interactive price history line charts
- 📰 Crypto news feed with image cards and external links
- 📊 Detailed coin view (price, volume, market rank, supply info)
- 🌐 External resource section (whitepapers, websites, forums)
- 🧩 Modular structure using reusable components
- ⛔ Graceful fallback when API limits are reached

---

## ✨ Learnings from This Project

As this was my **first full React project**, I gained hands-on experience with modern frontend development:

### 📘 React & Hooks:
- Built the entire app using functional components.
- Learned useState/useEffect for managing state & re-rendering.
- Passed dynamic props to subcomponents for interactivity.

### 🔁 API Integration with RTK Query:
- Connected live crypto data & news using RTK Query.
- Used `skipToken` for conditional queries.
- Managed loading and error states smartly.

### 🎨 UI Development:
- Used Ant Design grid system and typography.
- Handled layout issues and responsiveness manually & through AntD.
- Tweaked style using custom CSS + inline styles.

### 📊 Data Visualization:
- Plotted real-time coin history using line charts.
- Dynamically updated chart data based on selected time periods.

### 📚 Parsing & Displaying Content:
- Used html-react-parser to display HTML responses cleanly.
- Showed extra metadata like symbol, BTC price, supplies, etc.

---

## 📈 What I Plan to Improve Next

- 🔧 Move to **Tailwind CSS** or **Styled Components** for better styling
- ⚙️ Learn **React Context API** and **custom hooks**
- 🔐 Explore authentication (Firebase/Auth0) and protected routing
- ✅ Write unit/component tests (Jest + React Testing Library)
- 🗄️ Build a custom backend using **Express.js** to go beyond public APIs

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/Shanmukh1307/Crypto-Dashboard.git
cd Crypto-Dashboard
npm install
npm run dev

## 🌐 Live Demo
[View Live Site](https://your-site-name.netlify.app)

