import { useEffect, useState } from "react";
import Table from "../../Components/Table/Table";
import SideBar from "../../Components/SideBar/SideBar";
import config from "../../../config";
import ConfirmModal from "../../Components/ConfirmModal";

function Customers() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const Columns = ["#", "Name", "Email", "NIC", "Address", "Second Address", "Mobile Number", "Second Mobile Number", "WhatsApp", "Referrals", "Product Code", "Status"];
    const btnName = 'New Customer'

    useEffect(() => {
        fetchCustomerList();
    })

    const fetchCustomerList = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/customers`);
            if (!response.ok) {
                throw new Error(`Failed to fetch supplier payments list: ${response.status} ${response.statusText}`);
            }
            const cus = await response.json();
            const formattedData = cus.map(cus => [
                cus.cusId,
                cus.cusName,
                cus.cusEmail,
                cus.cusNIC,
                cus.cusAddress,
                cus.cusSecondAddress,
                cus.cusTP,
                cus.cusSecondTP,
                cus.cusWhatsapp,
                cus.referral || cus.secondReferral,
                cus.productCode,
                cus.cusStatus,
            ]);
            setData(formattedData);
        } catch (err) {
            setError(err.message);
        }
    };
    const handleDeleteRequest = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            const cusId = data[selectedRowIndex][0];
            const response = await fetch(`${config.BASE_URL}/customer/${cusId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }

            setData(prevData => prevData.filter((_, index) => index !== selectedRowIndex));
            fetchCustomerList();
        } catch (err) {
            setError(err.message);
        } finally {
            setShowConfirmModal(false);
            setSelectedRowIndex(null);
        }
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setSelectedRowIndex(null);
    };

    return (
        <div className='d-flex'>
            <SideBar />
            <div className="scrolling-container p-2">
                <h2 className="text-center">Customers List</h2>
                <Table
                    data={data}
                    columns={Columns}
                    btnName={btnName}
                    showActions={true}
                    showDate={false}
                    onDelete={handleDeleteRequest}
                />
                {/* Confirm Modal */}
                {showConfirmModal && (
                    <ConfirmModal
                        onConfirm={confirmDelete}
                        onClose={closeConfirmModal}
                    />
                )}
            </div>
        </div>
    )
}

export default Customers