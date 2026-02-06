# 🏦 Slinger Bank Of India (SBOI)

A complete Bank Account Management System with both C++ console application and web interface.

## 📁 Project Structure

```
bank_project/
├── bank_system.cpp       # C++ console application
├── index.html           # Web interface (HTML)
├── style.css            # Styling (CSS)
├── script.js            # Web functionality (JavaScript)
└── README.md            # This file
```

## 🚀 Getting Started

### C++ Console Application

#### Requirements:
- C++ compiler (g++, clang++, or MSVC)
- Terminal/Command Prompt

#### Compilation & Running:

**Linux/Mac:**
```bash
g++ bank_system.cpp -o bank_system
./bank_system
```

**Windows:**
```bash
g++ bank_system.cpp -o bank_system.exe
bank_system.exe
```

#### Features:
- ✅ Create new bank accounts
- ✅ Login with account number and password
- ✅ Deposit money
- ✅ Withdraw money
- ✅ Check balance
- ✅ View account details
- ✅ Transaction history
- ✅ Colored terminal output
- ✅ File-based data persistence

#### How to Use:
1. Run the program
2. Choose option 1 to create a new account
3. Enter your details (name, email, phone, Aadhaar, password)
4. Note your account number (e.g., SBOI101)
5. Choose option 2 to login with your account number and password
6. Access the main menu to perform banking operations

### Web Application

#### Requirements:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required (runs locally)

#### Running:
1. Simply open `index.html` in your web browser
2. Double-click the file or right-click → Open with → Browser

#### Features:
- ✅ Create new accounts
- ✅ Login system
- ✅ Modern responsive design
- ✅ Real-time balance updates
- ✅ Deposit & withdraw money
- ✅ Transaction history
- ✅ Account details view
- ✅ localStorage-based data persistence
- ✅ Beautiful gradient UI
- ✅ Notifications for actions

#### How to Use:
1. Open index.html in your browser
2. Fill the "Create Account" form on the right
3. Note your account number from the notification
4. Use the "Login" form on the left with your credentials
5. Access your dashboard to perform banking operations

## 🎨 Features

### Both Applications Include:
- Account creation with ₹500 minimum balance
- Secure password authentication
- Deposit and withdrawal operations
- Balance checking
- Complete transaction history
- Account details management

### Unique to C++ Version:
- File-based storage (creates .txt files for each account)
- Colored terminal output (Red, Green, Yellow, Blue, Magenta, Cyan)
- Console-based menu system

### Unique to Web Version:
- Beautiful gradient UI
- Responsive design (works on mobile)
- localStorage for data persistence
- Real-time notifications
- Modern card-based interface
- Smooth animations

## 📝 Account Data

### C++ Application:
- Stores accounts in individual `.txt` files
- Bank code counter in `Tasin-Coder-Bank-Of-India.txt`
- Format: `SBOI101`, `SBOI102`, etc.

### Web Application:
- Stores accounts in browser localStorage
- Each account is a JSON object
- Persists across browser sessions

## 🔐 Security Notes

**Important:** This is a demonstration/learning project. For production use:
- Implement proper password hashing
- Add server-side validation
- Use secure database storage
- Add encryption for sensitive data
- Implement session management
- Add HTTPS/SSL
- Implement rate limiting

## 🛠️ Customization

### Colors (C++ - Terminal):
Modify the color functions at the top of `bank_system.cpp`:
```cpp
void Red()      {   cout<<"\033[31m";   }
void Green()    {   cout<<"\033[32m";   }
// ... etc
```

### Colors (Web - CSS):
Modify the gradients in `style.css`:
```css
background: linear-gradient(120deg, #1e3c72, #2a5298);
```

### Bank Name:
- C++: Change `bankName = "SBOI"` in the class
- Web: Change in JavaScript where account numbers are generated

## 🐛 Troubleshooting

### C++ Issues:
- **"clear" command not found:** On Windows, change `system("clear")` to `system("cls")`
- **Colors not showing:** Some terminals don't support ANSI color codes
- **File not opening:** Ensure you have write permissions in the directory

### Web Issues:
- **Data not saving:** Check browser localStorage is enabled
- **Styles not loading:** Ensure all files are in the same folder
- **Account number missing:** Check browser console for errors

## 👨‍💻 Author

Created by Slinger

## 📄 License

This project is for educational purposes. Feel free to modify and use as needed!

---

**Happy Banking! 🏦💰**
