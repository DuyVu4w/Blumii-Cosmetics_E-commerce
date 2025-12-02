import React, { useState, useEffect } from 'react';
import AddressModal from '../../components/shared/AddressModal';
import PropTypes from 'prop-types';

// =========================================================================
// COMPONENT CON: AddressModal & Styles (Đã nhúng trực tiếp)
// =========================================================================
AddressModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};

// =========================================================================
// COMPONENT CHÍNH: ProfilePage
// =========================================================================

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('info'); // info, password, address
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    
    // States cho đổi mật khẩu
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const token = localStorage.getItem('auth_token');

    // Fetch Profile Data
    useEffect(() => {
        if (!token) {
            // Redirect hoặc thông báo nếu không có token
            return; 
        }
        
        fetch('/api/customer/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) setUser(data.data);
        })
        .catch(err => console.error(err));
    }, [token]);

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        alert('Tính năng cập nhật thông tin đang được phát triển');
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) return alert("Mật khẩu xác nhận không khớp");
        
        try {
            const res = await fetch('/api/customer/change-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    currentPassword: passwords.current, 
                    newPassword: passwords.new 
                })
            });
            const data = await res.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi đổi mật khẩu");
        }
    };

    const handleAddAddress = async (addressData) => {
        try {
            const res = await fetch('/api/customer/addresses', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...addressData, isDefault: false })
            });
            const data = await res.json();
            if (data.success) {
                // Cập nhật lại state user với danh sách địa chỉ mới
                setUser(prev => ({ ...prev, addresses: data.addresses }));
                setIsAddressModalOpen(false);
                alert("Thêm địa chỉ thành công!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm địa chỉ");
        }
    };

    const handleDeleteAddress = async (id) => {
        if(!window.confirm("Bạn chắc chắn muốn xóa địa chỉ này?")) return;
        try {
            const res = await fetch(`/api/customer/addresses/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setUser(prev => ({ ...prev, addresses: data.addresses }));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi xóa địa chỉ");
        }
    };

    if (!user) return <div className="p-10 text-center">Đang tải thông tin...</div>;

    return (
        <div className="container mx-auto p-5 font-sans text-gray-700">
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#81c408' }}>Quản Lý Hồ Sơ</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Menu */}
                <div className="w-full md:w-1/4 bg-white p-4 rounded shadow h-fit">
                    <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-gray-500 uppercase">
                            {user.customer_name ? user.customer_name.charAt(0) : 'U'}
                        </div>
                        <h3 className="mt-2 font-bold">{user.customer_name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <button 
                            onClick={() => setActiveTab('info')}
                            className={`p-2 text-left rounded transition-colors ${activeTab === 'info' ? 'bg-[#FFB524] font-bold text-white' : 'hover:bg-gray-100'}`}
                        >
                            Thông tin cá nhân
                        </button>
                        <button 
                            onClick={() => setActiveTab('address')}
                            className={`p-2 text-left rounded transition-colors ${activeTab === 'address' ? 'bg-[#FFB524] font-bold text-white' : 'hover:bg-gray-100'}`}
                        >
                            Sổ địa chỉ
                        </button>
                        <button 
                            onClick={() => setActiveTab('password')}
                            className={`p-2 text-left rounded transition-colors ${activeTab === 'password' ? 'bg-[#FFB524] font-bold text-white' : 'hover:bg-gray-100'}`}
                        >
                            Đổi mật khẩu
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="w-full md:w-3/4 bg-white p-6 rounded shadow">
                    
                    {/* TAB: INFO */}
                    {activeTab === 'info' && (
                        <form onSubmit={handleUpdateInfo}>
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Thông tin tài khoản</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Họ và tên</label>
                                <input type="text" defaultValue={user.customer_name} className="w-full p-2 border rounded bg-gray-50" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input type="email" value={user.email} readOnly className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Số điện thoại</label>
                                <input type="text" defaultValue={user.phone_number} className="w-full p-2 border rounded bg-gray-50" />
                            </div>
                            <button className="px-4 py-2 bg-[#81c408] text-white rounded hover:bg-[#6e9b06] transition">Cập nhật</button>
                        </form>
                    )}

                    {/* TAB: ADDRESS */}
                    {activeTab === 'address' && (
                        <div>
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold">Địa chỉ giao hàng</h2>
                                <button 
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className="px-3 py-1 border border-[#81c408] text-[#81c408] rounded hover:bg-[#81c408] hover:text-white transition"
                                >
                                    + Thêm địa chỉ
                                </button>
                            </div>
                            <div className="grid gap-4">
                                {user.addresses && user.addresses.length > 0 ? (
                                    user.addresses.map((addr, idx) => (
                                        <div key={idx} className="border p-4 rounded relative hover:shadow-md transition">
                                            <p className="font-bold text-lg">{addr.street}</p>
                                            <p className="text-sm text-gray-600">{addr.ward}, {addr.district}, {addr.province}</p>
                                            {addr.isDefault && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded mt-2 inline-block">Mặc định</span>}
                                            <button 
                                                onClick={() => handleDeleteAddress(addr._id)}
                                                className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm underline"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Chưa có địa chỉ nào được lưu.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB: PASSWORD */}
                    {activeTab === 'password' && (
                        <form onSubmit={handleChangePassword}>
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Đổi mật khẩu</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Mật khẩu hiện tại</label>
                                <input 
                                    type="password" 
                                    className="w-full p-2 border rounded"
                                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    className="w-full p-2 border rounded"
                                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Xác nhận mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    className="w-full p-2 border rounded"
                                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                                    required
                                />
                            </div>
                            <button className="px-4 py-2 bg-[#81c408] text-white rounded hover:bg-[#6e9b06] transition">Lưu mật khẩu</button>
                        </form>
                    )}
                </div>
            </div>

            <AddressModal 
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSave={handleAddAddress}
            />
        </div>
    );
};

export default ProfilePage;