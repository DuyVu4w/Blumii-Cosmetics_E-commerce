import React, { useState, useEffect } from "react";

/**
 * Component CSS nội bộ cho Modal
 * Được tách ra từ AuthPage
 */
const AddressModalStyles = () => (
  <style>
    {`
        /* 1. Đảm bảo font chữ nhất quán */
        .auth-modal-content, 
        .auth-modal-content select, 
        .auth-modal-content input {
            font-family: 'Montserrat', sans-serif;
        }

        .auth-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000; 
        }

        .auth-modal-content {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            width: 90%;
            max-width: 500px;
            z-index: 1001;
        }

        .auth-modal-content h2 {
            margin-top: 0;
            margin-bottom: 20px;
            color: #333;
            text-align: center;
        }

        .auth-modal-content .form-group {
            margin-bottom: 15px;
            width: 100%;
        }

        .auth-modal-content label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
            text-align: left;
            font-size: 12px;
        }

        .auth-modal-content select,
        .auth-modal-content input {
            background-color: #eee;
            border: none;
            padding: 12px 15px;
            margin: 0;
            width: 100%;
        }

        .auth-modal-content select:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
            color: #999;
        }

        .auth-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 25px;
        }

        /* 2. Style cho các nút trong Modal */
        .auth-modal-actions button {
            border-radius: 20px;
            border: 1px solid #FF4B2B;
            background-color: #FF4B2B;
            color: #FFFFFF;
            font-size: 12px;
            font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: transform 80ms ease-in;
            cursor: pointer;
        }
        .auth-modal-actions button.ghost {
            background-color: transparent;
            border-color: #FF4B2B;
            color: #FF4B2B;
        }
    `}
  </style>
);

/**
 * Component Modal Địa chỉ
 */
const AddressModal = ({ isOpen, onClose, onSave }) => {
  // State cho dữ liệu API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // State cho giá trị đang chọn
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "https://provinces.open-api.vn/api/v1";

  // 1. Fetch Tỉnh/TP khi component được mở
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const fetchProvinces = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/p`);
          const data = await response.json();
          setProvinces(data);
        } catch (error) {
          console.error("Failed to fetch provinces:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProvinces();
    }
  }, [isOpen]);

  // 2. Fetch Quận/Huyện khi Tỉnh/TP thay đổi
  useEffect(() => {
    if (selectedProvince) {
      const provinceCode = selectedProvince.split("|")[0];
      setIsLoading(true);
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/p/${provinceCode}?depth=2`
          );
          const data = await response.json();
          setDistricts(data.districts || []);
          setWards([]);
          setSelectedDistrict("");
          setSelectedWard("");
        } catch (error) {
          console.error("Failed to fetch districts:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  // 3. Fetch Phường/Xã khi Quận/Huyện thay đổi
  useEffect(() => {
    if (selectedDistrict) {
      const districtCode = selectedDistrict.split("|")[0];
      setIsLoading(true);
      const fetchWards = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/d/${districtCode}?depth=2`
          );
          const data = await response.json();
          setWards(data.wards || []);
          setSelectedWard("");
        } catch (error) {
          console.error("Failed to fetch wards:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  // 4. Xử lý lưu
  const handleSave = () => {
    // Tách lấy TÊN (phần tử thứ 2) từ giá trị đã chọn
    const provinceName = selectedProvince.split("|")[1] || "";
    const districtName = selectedDistrict.split("|")[1] || "";
    const wardName = selectedWard.split("|")[1] || "";

    // Gửi dữ liệu về component cha
    onSave({
      street,
      ward: wardName,
      district: districtName,
      province: provinceName,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <AddressModalStyles />
      <div className="auth-modal-backdrop" onClick={onClose}>
        <div
          className="auth-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{isLoading ? "Data loading..." : "Select your address"}</h2>

          {/* Tỉnh/Thành phố */}
          <div className="form-group">
            <label htmlFor="province">Province/City</label>
            <select
              id="province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              disabled={isLoading}
            >
              <option value="">-- Select Province/City --</option>
              {provinces.map((p) => (
                <option key={p.code} value={`${p.code}|${p.name}`}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quận/Huyện */}
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!districts.length || isLoading}
            >
              <option value="">-- Select District --</option>
              {districts.map((d) => (
                <option key={d.code} value={`${d.code}|${d.name}`}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phường/Xã */}
          <div className="form-group">
            <label htmlFor="ward">Ward/Commue</label>
            <select
              id="ward"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!wards.length || isLoading}
            >
              <option value="">-- Select Ward/Commue --</option>
              {wards.map((w) => (
                <option key={w.code} value={`${w.code}|${w.name}`}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Số nhà, Tên đường */}
          <div className="form-group">
            <label htmlFor="street">House number, Street name</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Example: 123 ABC Street"
              disabled={isLoading}
            />
          </div>

          {/* Nút bấm */}
          <div className="auth-modal-actions">
            <button type="button" onClick={onClose} className="ghost">
              Cancel
            </button>
            <button type="button" onClick={handleSave}>
              Save Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
