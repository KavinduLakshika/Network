import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";

function CusForm() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cusAddress1: '',
        cusAddress2: '',
        nic: '',
        mobileNum: '',
        mobileNum2: '',
        whatsappNum: '',
        referral: '',
        referral2: '',
        productCode: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];
        if (!formData.fullName.trim()) errors.push("Full name is required.");
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            errors.push("A valid email is required.");
        if (!formData.cusAddress1.trim()) errors.push("Address Line 1 is required.");
        if (!formData.mobileNum.trim() || !/^\d{10}$/.test(formData.mobileNum))
            errors.push("Mobile number must be 10 digits.");
        if (formData.mobileNum2 && !/^\d{10}$/.test(formData.mobileNum2))
            errors.push("Second mobile number must be 10 digits.");
        if (formData.whatsappNum && !/^\d{10}$/.test(formData.whatsappNum))
            errors.push("WhatsApp number must be 10 digits.");
        if (!formData.productCode.trim()) errors.push("Product code is required.");

        if (errors.length > 0) {
            setError(errors.join(" "));
            return;
        }

        try {
            const response = await fetch(`${config.BASE_URL}/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cusName: formData.fullName,
                    cusNIC: formData.nic,
                    cusEmail: formData.email,
                    cusAddress: formData.cusAddress1,
                    cusSecondAddress: formData.cusAddress2,
                    cusTP: formData.mobileNum,
                    cusSecondTP: formData.mobileNum2,
                    cusWhatsApp: formData.whatsappNum,
                    referral: formData.referral,
                    secondReferral: formData.referral2,
                    productCode: formData.productCode,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create customer');
            }

            const data = await response.json();
            console.log('Customer created successfully:', data);
            setSuccessMessage("User Registered successfully.");
            setError(null);
            navigate('/successful');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <form className="p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h3 className="display-">User Form</h3>
                    <p className="text-muted">Fill out the form below with your details</p>
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <h5 className="form-label">Full Name</h5>
                        <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Email</h5>
                        <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Address Line 1</h5>
                        <input type="text" className="form-control" name="cusAddress1" value={formData.cusAddress1} onChange={handleChange} placeholder="Enter address line 2" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Address Line 2</h5>
                        <input type="text" className="form-control" name="cusAddress2" value={formData.cusAddress2} onChange={handleChange} placeholder="Enter address line 2" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">NIC</h5>
                        <input type="text" className="form-control" name="nic" value={formData.nic} onChange={handleChange} placeholder="Enter NIC number" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Mobile Number</h5>
                        <input type="text" className="form-control" name="mobileNum" value={formData.mobileNum} onChange={handleChange} placeholder="Enter mobile number" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Second Mobile Number</h5>
                        <input type="text" className="form-control" name="mobileNum2" value={formData.mobileNum2} onChange={handleChange} placeholder="Enter second mobile number" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">WhatsApp Number</h5>
                        <input type="text" className="form-control" name="whatsappNum" value={formData.whatsappNum} onChange={handleChange} placeholder="Enter WhatsApp number" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Referral Number</h5>
                        <input type="text" className="form-control" name="referral" value={formData.referral} onChange={handleChange} placeholder="Enter referral number" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Second Referral Number</h5>
                        <input type="text" className="form-control" name="referral2" value={formData.referral2} onChange={handleChange} placeholder="Enter referral number" />
                    </div>

                    <div className="col-md-6">
                        <h5 className="form-label">Product Code</h5>
                        <input type="text" className="form-control" name="productCode" value={formData.productCode} onChange={handleChange} placeholder="Enter product code" />
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-info">Save changes</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CusForm;
