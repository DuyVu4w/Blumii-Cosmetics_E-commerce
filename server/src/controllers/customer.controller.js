const Customer = require("../models/Customer.model");
const bcrypt = require("bcryptjs");

// [GET] /api/customer/profile
exports.getProfile = async (req, res) => {
  try {
    // req.user được gán từ middleware xác thực (cần viết middleware)
    const customer = await Customer.findById(req.user.id).select("-password");
    if (!customer)
      return res.status(404).json({ message: "Cann't find user." });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [PUT] /api/customer/profile
exports.updateProfile = async (req, res) => {
  const { customer_name, phone_number } = req.body;
  try {
    const customer = await Customer.findById(req.user.id);
    if (customer_name) customer.customer_name = customer_name;
    if (phone_number) customer.phone_number = phone_number;

    await customer.save();
    res.json({
      success: true,
      message: "Update information successful.",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [POST] /api/customer/change-password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const customer = await Customer.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Current pass is incorrect." });

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(newPassword, salt);

    await customer.save();
    res.json({ success: true, message: "Password has been changed." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [POST] /api/customer/addresses
exports.addAddress = async (req, res) => {
  const { street, ward, district, province, isDefault } = req.body;
  try {
    const customer = await Customer.findById(req.user.id);

    // Nếu là địa chỉ mặc định, set các địa chỉ khác thành false
    if (isDefault) {
      customer.addresses.forEach((addr) => (addr.isDefault = false));
    }

    customer.addresses.push({
      street,
      ward,
      district,
      province,
      isDefault: isDefault || false,
    });
    await customer.save();

    res.json({
      success: true,
      message: "Add address successfully.",
      addresses: customer.addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [DELETE] /api/customer/addresses/:addressId
exports.deleteAddress = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id);
    customer.addresses = customer.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );
    await customer.save();
    res.json({
      success: true,
      message: "Delete address successfully.",
      addresses: customer.addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
