# 💰 Cost Manager Application

___

## 📌 Overview
The **Cost Manager** Application is a **React-based** web application that allows users to efficiently track their expenses. It provides features such as **adding expense entries, viewing monthly reports, and visualizing expenses using pie charts**. The application uses **IndexedDB** for local storage and is designed with **Material UI** for a modern interface.

___

## 🌟 Features
* ✅ **Expense Logging:** Add, categorize, and manage expenses.
* ✅ **Monthly Reports:** View detailed expense reports grouped by categories.
* ✅ **Data Visualization:** Pie chart representation of expenses per category.
* ✅ **IndexedDB Storage:** Persistent storage for offline access.
* ✅ **Responsive UI:** Optimized for different screen sizes.

---

## 🛠️ Tech Stack
The project is built using modern web development technologies:

| Technology | Usage |
|:----------:|:----------:|
| **React.js**|JavaScript library for building UI components. |
| **Material UI** |Component library for a modern design. |
| **IndexedDB**	|Client-side database for storing expenses. |
| **Google Charts** |Visualization library for displaying expense data. |
| **jsPDF** |Library for generating expense reports in PDF format. |

---

## 📂 Project Structure
```
📂 Project/
 ├── 📁 public/          # Contain the site favicon.
 ├── 📁 src/             # Main source files.
      ├── 📁 components/ # React components (Header, CostForm, ReportViewer, ChartViewer, ReceiptDialog).
      ├── 📄  App.js      #  Main application layout.
      ├── 📄  idb.js      #  IndexedDB utility functions
 ├── .env.example        # Example environment variables
 ├── README.md         # Project documentation
```

---

## 🚀 Getting Started
To set up and run this project, you need to install all required dependencies. Follow these steps:
#### 1️⃣ Clone the repository
```
git clone https://github.com/shoham404/Cost-Manager-REStful-Web-Services.git
```
#### 2️⃣ Install dependencies
**Install required dependencies:** Run the following command to install all necessary packages:
```
npm install
```
##### Ensure the following dependencies are installed:
**Project dependencies:**
```
npm install express body-parser dotenv mongodb mongoose
```
**Development & Testing dependencies:**
```
npm install --save-dev jest supertest
```
### 3️⃣ Set up environment variables
Create a .env file in the root directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
```
### 4️⃣ To start the server
```
npm start
```
The API will be available at http://localhost:3000/.
### 5️⃣ To run the tests:
```
npm test
```
#### Tests cover:

* User management
* Expense handling
* Report generation
* Error handling cases

**💡 This ensures all necessary dependencies are installed and properly configured before running the application. 🚀**

---

## 📡 API Endpoints
### 🧑 User Routes
| Method | Endpoint | Description |
|:----------:|:----------:|:----------:|
| **POST**   | `/api/users/add` | Add a new user |
| **GET**  | `/api/users/:id`   | Retrieve user details |

### 💰 Expense Routes
| Method | Endpoint | Description |
|:----------:|:----------:|:-------
| **POST**   | `/api/add` | Add a new expense |

### 📊 Report Routes
| Method | Endpoint | Description |
|:----------:|:----------:|:-------
| **GET**   | `/api/report` | Retrieve a monthly expense report |

---

## 🤝 Contributing

Want to contribute? Follow these steps:

1. **Fork** this repository.
2. **Create** a new feature branch (git checkout -b feature-branch).
3. **Commit** changes (git commit -m "Added new feature").
4. **Push** to GitHub (git push origin feature-branch).
5. **Submit** a pull request. 🚀

---

## 📝 License
This project is licensed under the **MIT License.** 





