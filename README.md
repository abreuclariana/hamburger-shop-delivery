# 🍔 Dev Burguer

Dev Burguer is a simple and responsive burger shop landing page that includes a cart system, modal interaction, and WhatsApp integration for checkout.

This project was built using **HTML**, **CSS (Tailwind CSS)**, and **JavaScript** to simulate an online food ordering experience for a local hamburger restaurant.

---

## 📸 Preview

![CL Burguer Preview](./preview.png)

---

## 🚀 Features

- 📋 Burger menu with add-to-cart functionality
- 🛒 Cart modal with item quantity, total price, and remove option
- 💬 Checkout via WhatsApp (including address)
- ⏰ Store open hour validation (6 PM to 10 PM)
- 📱 Mobile-responsive layout
- ✅ Input validation for delivery address

---

## ⚙️ How it works

1. Users can browse the burger menu.
2. Each item has an **"Add to cart"** button with name and price.
3. The cart modal shows added items, quantity, and the total price.
4. The "Checkout" button opens a WhatsApp message with order details and delivery address.
5. If the store is closed (before 6 PM or after 10 PM), a toast message is shown.
6. Address input is required before completing the checkout.

---

## 📦 Technologies Used

- **HTML5**
- **Tailwind CSS**
- **Vanilla JavaScript**
- **Toastify.js** (for toast notifications)
- **WhatsApp API** for order messaging

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/dev-burguer.git

 2. Navigate into the project folder:

        cd dev-burguer

 3. Open index.html in your browser, or use a live server extension in VS Code.

📝 Customization

You can change the burger items by editing the HTML buttons in the menu section.

Change the WhatsApp phone number by updating the phone variable in script.js:


    const phone = "71999999999"; // Replace with your number

🧑‍🍳 Author

Made with by Clariana Abreu

📄 License

This project is licensed under the MIT License.


