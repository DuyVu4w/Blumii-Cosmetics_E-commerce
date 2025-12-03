import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../components/profile/Sidebar';
import AddressModal from '../../components/shared/AddressModal';

Sidebar.propTypes = {
    activeSection: PropTypes.string,
    setActiveSection: PropTypes.func,
    user: PropTypes.object
};

AddressModal.propTypes = { isOpen: PropTypes.bool, onClose: PropTypes.func, onSave: PropTypes.func };

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');

    useEffect(() => {
        if (!token) { navigate('/auth'); return; }
        fetch('/api/customer/profile', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => { if (data.success) setUser(data.data); else { localStorage.removeItem('auth_token'); navigate('/auth'); } })
            .catch(err => console.error(err));
    }, [token, navigate]);

    const handleUpdateInfo = async (e) => { e.preventDefault(); alert('Cập nhật thông tin thành công (Giả lập)'); };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) return alert("Mật khẩu xác nhận không khớp");
        try {
            const res = await fetch('/api/customer/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new })
            });
            const data = await res.json();
            alert(data.message);
        } catch (error) { console.error(error); alert("Lỗi khi đổi mật khẩu"); }
    };

    const handleAddAddress = async (addressData) => {
        try {
            const res = await fetch('/api/customer/addresses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...addressData, isDefault: false })
            });
            const data = await res.json();
            if (data.success) {
                setUser(prev => ({ ...prev, addresses: data.addresses }));
                setIsAddressModalOpen(false);
                alert("Thêm địa chỉ thành công!");
            } else { alert(data.message); }
        } catch (error) { console.error(error); alert("Lỗi khi thêm địa chỉ"); }
    };

    const handleDeleteAddress = async (id) => {
        if (!window.confirm("Xóa địa chỉ này?")) return;
        try {
            const res = await fetch(`/api/customer/addresses/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setUser(prev => ({ ...prev, addresses: data.addresses }));
            else alert(data.message);
        } catch (err) { console.error(err); alert("Lỗi khi xóa địa chỉ"); }
    };

    if (!user) return <div className="p-10 text-center">Đang tải thông tin...</div>;

    return (
        <div className="container mx-auto p-5 font-sans text-gray-700">
            <div className="mb-8"><h1 className="text-3xl font-bold" style={{ color: '#81c408' }}>Tài Khoản Của Tôi</h1></div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                    <Sidebar activeSection={activeTab} setActiveSection={setActiveTab} user={user} />
                </div>
                <div className="w-full md:w-3/4 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    {activeTab === 'info' && (
                        <form onSubmit={handleUpdateInfo}>
                            <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">Thông tin tài khoản</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div><label className="block text-sm font-semibold mb-2 text-gray-600">Họ và tên</label><input type="text" defaultValue={user.customer_name} className="w-full p-3 border rounded-lg bg-gray-50" /></div>
                                <div><label className="block text-sm font-semibold mb-2 text-gray-600">Số điện thoại</label><input type="text" defaultValue={user.phone_number} className="w-full p-3 border rounded-lg bg-gray-50" /></div>
                                <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2 text-gray-600">Email</label><input type="email" value={user.email} readOnly className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-500" /></div>
                            </div>
                            <button className="px-6 py-2 bg-[#81c408] text-white rounded-lg hover:bg-[#6e9b06] transition font-semibold shadow-md">Cập nhật thông tin</button>
                        </form>
                    )}
                    {activeTab === 'address' && (
                        <div>
                            <div className="flex justify-between items-center mb-6 border-b pb-3">
                                <h2 className="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
                                <button onClick={() => setIsAddressModalOpen(true)} className="px-4 py-2 bg-white border border-[#81c408] text-[#81c408] rounded-lg hover:bg-[#81c408] hover:text-white transition font-medium">+ Thêm địa chỉ mới</button>
                            </div>
                            <div className="grid gap-4">
                                {user.addresses && user.addresses.length > 0 ? user.addresses.map((addr, idx) => (
                                    <div key={idx} className="border border-gray-200 p-5 rounded-lg relative hover:shadow-md transition bg-gray-50">
                                        <p className="font-bold text-lg text-gray-800 mb-1">{addr.street}</p>
                                        <p className="text-sm text-gray-600">{addr.ward}, {addr.district}, {addr.province}</p>
                                        {addr.isDefault && <span className="mt-3 inline-block text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Mặc định</span>}
                                        <button onClick={() => handleDeleteAddress(addr._id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium hover:underline">Xóa</button>
                                    </div>
                                )) : <p className="text-gray-500 italic text-center py-10 bg-gray-50 rounded">Chưa có địa chỉ nào được lưu.</p>}
                            </div>
                        </div>
                    )}
                    {activeTab === 'password' && (
                        <form onSubmit={handleChangePassword} className="max-w-md">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">Đổi mật khẩu</h2>
                            <div className="mb-4"><label className="block text-sm font-semibold mb-2 text-gray-600">Mật khẩu hiện tại</label><input type="password" className="w-full p-3 border rounded-lg" onChange={e => setPasswords({ ...passwords, current: e.target.value })} required /></div>
                            <div className="mb-4"><label className="block text-sm font-semibold mb-2 text-gray-600">Mật khẩu mới</label><input type="password" className="w-full p-3 border rounded-lg" onChange={e => setPasswords({ ...passwords, new: e.target.value })} required /></div>
                            <div className="mb-6"><label className="block text-sm font-semibold mb-2 text-gray-600">Xác nhận mật khẩu mới</label><input type="password" className="w-full p-3 border rounded-lg" onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required /></div>
                            <button className="px-6 py-2 bg-[#81c408] text-white rounded-lg hover:bg-[#6e9b06] transition font-semibold shadow-md">Lưu mật khẩu</button>
                        </form>
                    )}
                    {activeTab === 'myorder' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">Đơn hàng của tôi</h2>
                            <p className="text-gray-500">Bạn chưa có đơn hàng nào gần đây.</p>
                        </div>
                    )}
                </div>
            </div>
            <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} onSave={handleAddAddress} />
        </div>
    );
};

export default ProfilePage;