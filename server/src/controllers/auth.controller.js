const Customer = require("../models/Customer.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const emailService = require("../services/email.service"); // Import Service gửi email

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_strong_jwt_secret";
const DEFAULT_SIGNUP_PASSWORD =
  process.env.DEFAULT_SIGNUP_PASSWORD || "default_secure_password_123456";

// [POST] /api/auth/register
exports.register = async (req, res) => {
  const { customer_name, phone_number, email, address } = req.body;

  if (!customer_name || !phone_number || !email || !address) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all information." });
  }

  try {
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { phone_number }],
    });
    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "Email or phone number has already been registered.",
      });
    }

    // 1. Tạo mật khẩu ngẫu nhiên
    const randomPassword = crypto.randomBytes(4).toString("hex");

    // 2. Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    const newCustomer = new Customer({
      customer_name,
      phone_number,
      email,
      address,
      password: hashedPassword,
      status: "active",
    });

    await newCustomer.save();

    const emailSubject = "BLUMMI COSMETICS Account Information";
    const emailContent = `
            <h3>Welcome to BLUMMI COSMETICS!</h3>
            <p>Your account has been successfully created.</p>
            <p>Your login password is: <strong style="font-size: 16px; color: #81c408;">${randomPassword}</strong></p>
            <p>Please log in and change your password immediately to ensure security.</p>
            <br/>
            <p>Sincerely,<br/>BLUMMI COSMETICS Team.</p>
        `;

    await emailService.sendEmail(email, emailSubject, emailContent);

    const token = jwt.sign(
      { id: newCustomer._id, email: newCustomer.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      message:
        "Registration successful! Your password has been sent to your email.",
      token: token,
    });
  } catch (error) {
    console.error("Lỗi Đăng ký MongoDB:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed due to a server error.",
    });
  }
};

// [POST] /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter both email and password.",
    });
  }

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password." });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password." });
    }

    const token = jwt.sign(
      { id: customer._id, email: customer.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Lỗi Đăng nhập MongoDB:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed due to a server error." });
  }
};

// [POST] /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "The email does not exist in the system.",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    customer.resetPasswordToken = resetToken;
    customer.resetPasswordExpires = Date.now() + 3600000; // 1 giờ

    await customer.save();

    // Gửi Token qua Email
    const emailSubject = "Password recovery request - BLUMMI COSMETICS";
    const emailContent = `
            <h3>Password reset request</h3>
            <p>You have requested to reset the password for your BLUMMI COSMETICS account.</p>
            <p>Your verification code is: <strong style="font-size: 18px; color: #FFB524;">${resetToken}</strong></p>
            <p>Please enter this code on the password recovery page.</p>
            <p><i>This code will expire in 1 hour.</i></p>
            <br/>
            <p>Sincerely,<br/>BLUMMI COSMETICS Team</p>
        `;

    // Gọi service gửi mail
    await emailService.sendEmail(email, emailSubject, emailContent);

    res.json({
      success: true,
      message: "The recovery code has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// [POST] /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const customer = await Customer.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "The recovery code is invalid or has expired.",
      });
    }

    // Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(newPassword, salt);

    // Xóa token sau khi sử dụng
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpires = undefined;

    await customer.save();

    res.json({
      success: true,
      message: "The password has been successfully changed! Please log in.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
