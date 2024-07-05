"use server";
import nodemailer from "nodemailer";

export async function sendOrderConfirmation(email, orderDetails, grandTotal) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Example: Replace with your SMTP server hostname
      port: 465,
      secure: true,
      auth: {
        user: "whiteiphone8photos@gmail.com", // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail password or app-specific password
      },
    });

    let info = await transporter.sendMail({
      from: "whiteiphone8photos@gmail.com", // Sender address
      to: email, // Recipient's email address
      subject: "Order Confirmation", // Subject line
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order! Here are the details:</p>
        <ul>
          ${orderDetails
            .map(
              (item) => `<li>${item.name}: ${item.count} x $${item.price}</li>`
            )
            .join("")}
        </ul>
        <p>Total: $${orderDetails.reduce(
          (total, item) => total + item.price * item.count,
          0
        )}</p>
        <p>Grand Total: ${grandTotal}</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send order confirmation email");
  }
}
