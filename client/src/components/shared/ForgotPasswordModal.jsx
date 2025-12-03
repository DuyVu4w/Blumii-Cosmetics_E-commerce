import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Định nghĩa CSS nội bộ để component hoạt động độc lập
const ModalStyles = () => (
    <style>{`
        .auth-modal-backdrop {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex; justify-content: center; align-items: center; z-index: 1050; 
        }
        .auth-modal-content {
            background-color: #fff; padding: 30px; border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: 90%; max-width: 450px;
            font-family: 'Montserrat', sans-serif; z-index: 1051; position: relative;
        }
        .auth-modal-content h2 {
            margin-top: 0; margin-bottom: 15px; color: #333; text-align: center;
            font-weight: bold; font-size: 20px;
        }
        .auth-modal-content p {
            font-size: 14px; color: #666; margin-bottom: 20px; text-align: center; line-height: 1.5;
        }
        .auth-modal-content .form-group { margin-bottom: 15px; width: 100%; }
        .auth-modal-content label {
            display: block; margin-bottom: 5px; font-weight: bold; color: #555;
            text-align: left; font-size: 12px;
        }
        .auth-modal-content input {
            background-color: #eee; border: none; padding: 12px 15px; margin: 0;
            width: 100%; box-sizing: border-box; border-radius: 5px;
        }
        .auth-modal-actions {
            display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px;
        }
        .auth-modal-actions button {
            border-radius: 20px; border: 1px solid #81c408; background-color: #81c408;
            color: #FFFFFF; font-size: 12px; font-weight: bold; padding: 12px 25px;
            letter-spacing: 1px; text-transform: uppercase; transition: 0.3s; cursor: pointer;
        }
        .auth-modal-actions button:hover { background-color: #6e9b06; }
        .auth-modal-actions button.ghost {
            background-color: transparent; border-color: #FFB524; color: #FFB524;
        }
        .auth-modal-actions button.ghost:hover { background-color: #fff8e1; }
        .text-green { color: #28a745; font-weight: bold; }
        .text-red { color: #dc3545; font-size: 12px; margin-top: 5px; }
    `}</style>
);

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1); // 1: Input Email, 2: Input Token & New Pass
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Reset state khi đóng modal
    const handleClose = () => {
        setStep(1);
        setEmail('');
        setToken('');
        setNewPassword('');
        setMessage('');
        onClose();
    };

    const handleSendEmail = async () => {
        if (!email) return alert("Please enter your email address.");
        setLoading(true);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                setMessage("Reset code sent! Please check your email.");
                setStep(2);
            } else {
                alert(data.message || "Failed to send reset code.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!token || !newPassword) return alert("Please enter the code and your new password.");
        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                alert("Password reset successfully! You can now login.");
                handleClose();
            } else {
                alert(data.message || "Failed to reset password.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <ModalStyles />
            <div className="auth-modal-backdrop" onClick={handleClose}>
                <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Password Recovery</h2>
                    
                    {step === 1 ? (
                        <>
                            <p>Enter your email address to receive a recovery code.</p>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email..." 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    autoFocus
                                />
                            </div>
                            <div className="auth-modal-actions">
                                <button className="ghost" onClick={handleClose} disabled={loading}>Cancel</button>
                                <button onClick={handleSendEmail} disabled={loading}>
                                    {loading ? "Sending..." : "Send Code"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-green">{message}</p>
                            <div className="form-group">
                                <label>Recovery Code</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter code from email" 
                                    value={token} 
                                    onChange={e => setToken(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    value={newPassword} 
                                    onChange={e => setNewPassword(e.target.value)} 
                                />
                            </div>
                            <div className="auth-modal-actions">
                                <button className="ghost" onClick={() => setStep(1)} disabled={loading}>Back</button>
                                <button onClick={handleResetPassword} disabled={loading}>
                                    {loading ? "Processing..." : "Reset Password"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

ForgotPasswordModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ForgotPasswordModal;