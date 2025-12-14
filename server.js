const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTE =================
app.post("/submit-form", async (req, res) => {
  const data = req.body;

  // Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thementalhealthaccess@gmail.com",   // OWNER EMAIL
      pass: "lktz mwts kkjc cpwe"      // ⚠ Gmail App Password
    }
  });

  // Mail options
 const mailOptions = {
  from: "Client Intake <test@gmail.com>",
  to: "thementalhealthaccess@gmail.com",
  subject: "🧠 New Therapy Intake Form Submission",
  html: `
    <h2>New Client Intake Form</h2>
    <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
    <p><b>Date of Birth:</b> ${data.dob}</p>
    <p><b>Age:</b> ${data.age}</p>
    <p><b>Gender:</b> ${data.gender}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Marital Status:</b> ${data.maritalStatus}</p>
    <p><b>Preferred Language:</b> ${data.language}</p>
    <p><b>Current Occupation:</b> ${data.occupation}</p>        <!-- Added -->
    <p><b>Education:</b> ${data.education}</p>                  <!-- Added -->
    <p><b>Preferred Session:</b> ${data.sessionDateTime || `${data.sessionDay} ${data.sessionTime}`}</p> <!-- Added -->
    <p><b>Concerns:</b><br>${data.concern}</p>
  `
};


  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

// ================= SERVER =================
app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});
