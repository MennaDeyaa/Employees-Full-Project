
# Employees Full Project

A full-stack employee management system built using **Angular (standalone)** and **ASP.NET Core 8 Web API** with **Onion Architecture** and **SQL Server Stored Procedures**.  
This system allows users to manage employee records with features like search, sort, pagination, and multi-language support.

🎥 [Watch Demo Video](https://drive.google.com/file/d/1oL3I0sNRHnLBNUMM9ZBDS5rBFmis7tHO/view?usp=sharing)

---

## 📚 Features

- 🔍 **Search** by name or email
- ↕️ **Sorting** by name or email (ASC / DESC)
- 📄 **Pagination**
- ➕ **Add Employee**
- ✏️ **Edit Employee**
- ❌ **Delete Single Employee**
- 🗑️ **Delete Multiple Employees**
- 🌐 **Multi-language Translation**: Users can switch between **English** and **Arabic** dynamically
- 🧅 **Onion Architecture** for clean backend layering
- 🗃️ **Stored Procedures** for database interaction (Database First approach)
- 📦 **Modular Folder Structure** (Frontend / Backend / SQL)
- 📡 **RESTful APIs** using ASP.NET Core 8
- 🎥 **Zoom Integration**: Automatic Zoom meeting generation via Zoom API

---

## 🛠️ Technologies Used

### 🖥️ Frontend:
- Angular (Standalone)
- TypeScript
- Bootstrap 
- ngx-translate (i18n support for Arabic & English)

### ⚙️ Backend:
- ASP.NET Core 8 Web API
- C#
- Onion Architecture
- Entity Framework Core (Database First)
- SQL Server (Stored Procedures)
- Zoom API Integration

### 🗃️ Tools & Others:
- Git & GitHub
- Visual Studio / VS Code
- Postman for API testing

---

## 📂 Project Structure

```
employees-full-project/
│
├── employees-project/           # Angular Frontend
├── employeemanagement/          # .NET 8 Backend (Onion Architecture)
└── sql/                         # SQL Scripts for DB and Stored Procedures
```

---

## ⚙️ Setup Instructions

> Make sure you have installed:
> - Node.js & Angular CLI
> - .NET 8 SDK
> - SQL Server & SSMS

### 🔧 Backend (.NET 8)
1. Open `employeemanagement` in Visual Studio
2. Restore NuGet packages
3. Update DB connection string in `appsettings.json`
4. Run the project (F5)

### 🌐 Frontend (Angular)
```bash
cd employees-project
npm install
ng serve
```

### 🗃️ Database
1. Open SQL Server Management Studio
2. Run scripts inside `sql/` folder 


## 📌 Notes

- This project follows a **clean and scalable architecture** using Onion layers.
- SQL scripts are modular and reusable.
- Zoom API is optional and can be removed if not needed.
- The app supports **dynamic language switching** between Arabic and English using ngx-translate.

---

## 📷 Video Demo

👉 [Click to Watch Demo](https://drive.google.com/file/d/1oL3I0sNRHnLBNUMM9ZBDS5rBFmis7tHO/view?usp=sharing)

---

## 🤝 Author

**Menna Deyaa**  
.NET Full Stack Developer 
