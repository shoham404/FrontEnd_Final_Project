# 💰 Cost Manager Application

___

## 📌 Overview
The **Cost Manager** Application is a **React-based** web application that allows users to efficiently track their expenses. It provides features such as **adding expense entries, viewing monthly reports, and visualizing expenses using pie charts**. The application uses **IndexedDB** for local storage and is designed with **Material UI** for a modern interface.
### You can view the site online at https://frontend-final-project-fbw1.onrender.com.
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

## 🚀 Getting Started
To set up and run this project, you need to install all required dependencies. Follow these steps:
#### 1️⃣ Clone the repository
```
git clone https://github.com/shoham404/FrontEnd_Final_Project.git
```
#### 2️⃣ Install dependencies
**Install required dependencies:** Run the following command to install all necessary packages:
```
npm install
```
##### Ensure the following dependencies are installed:
**Project dependencies:**
```
npm install @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material @mui/material jspdf react-google-charts
```
npm install
```
npm install --save-dev
```
**💡 This ensures all necessary dependencies are installed and properly configured before running the application. 🚀**

### 3️⃣ To start the server
```
npm run dev
```
The API will be available at http://localhost:Port_Number/.
You can see the port number via the terminal.


## 📡 Application Components

### 🧾 Core Application Components
| Component | Description | 
|:----------:|:----------:|
| **App.jsx**   | Main application layout, managing structure and routing. | 
| **idb.js**  | IndexedDB functions for storing and retrieving expenses. | 

### 📊 Reports & Visualization
| Component | Description | 
|:----------:|:----------:|
| **CostForm.jsx**   | Form for adding new expense entries. | 
| **Header.jsx**   | Displays the application's navigation bar. | 
| **ReportViewer.jsx**   | Displays a monthly expense report. | 
| **ChartViewer.jsx** | Generates a pie chart for expense distribution.| 
| **ReceiptDialog**   | Responsible for designing the report and the option to save it as a PDF file. |

---

## 🤝 Contributing

Want to contribute? Follow these steps:

1. **Fork** this repository.
2. **Create** a new feature branch `git checkout -b feature-branch`.
3. **Commit** changes `git commit -m "Added new feature"`.
4. **Push** to GitHub `git push origin feature-branch`.
5. **Submit** a pull request. 🚀

---

## 📝 License
This project is licensed under the **MIT License.** 





