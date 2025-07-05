# 💸 IRR (Internal Rate of Return) Calculator

A dynamic, browser-based IRR calculator built using vanilla HTML, CSS (Bootstrap), and JavaScript. It allows users to enter yearly cash flows, compute the effective IRR, and dynamically reduce effort by pre-filling repeated values.

---

## 🚀 Features

- 🧮 **IRR Calculation** using binary search and NPV (Net Present Value) logic.
- 📆 **Dynamic Field Generation** based on the number of years entered.
- ⚡ **Pre-Populate Cash Flows**: Copy a single year’s value to multiple years in one click — saves time during repetitive data entry.
- ✅ **Form Validation** and friendly error messages for incorrect inputs.
- 🎨 Clean, responsive design with Bootstrap 5.



---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (via Bootstrap 5)
- **JavaScript (Vanilla)**

---

## 🧠 How It Works

1. Enter the number of years for cash flows.
2. Click **"Generate Fields"**.
3. Input cash flow values (negative for investment, positive for returns).
4. Use **"Pre-Populate"**:
   - Choose a base year
   - Enter a target year (e.g., Year 5)
   - The value from the base year is copied to all years up to the target
5. Click **Compute IRR** to see the calculated result.

---

## 📁 Project Structure

📦 irr-calculator/
├── index.html
├── style.css
├── script.js
└── README.md


---

## 🔍 Concepts Used

- DOM Manipulation (create, update, listen, insert)
- Event Delegation
- Form Validation
- Net Present Value (NPV) Formula
- Binary Search Algorithm
- State-driven UI with Bootstrap Grid

---

## 🌐 Live Demo

[🔗 Hosted on GitHub Pages](https://kaushalravin.github.io/interest-rate-on-return-calculator/)

---

## 🧑‍💻 Author

**Kaushal Ravin**  
- [GitHub](https://github.com/kaushalravin)
- [LinkedIn]([https://www.linkedin.com/in/your-link](https://www.linkedin.com/in/kaushal-n-904519326))

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

