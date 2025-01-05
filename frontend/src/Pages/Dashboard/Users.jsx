import { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar"
import Table from "../../Components/Table/Table"
import ConfirmModal from "../../Components/ConfirmModal";
import config from "../../../config";

function Users() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const Columns = ["#", "Name", "Type", "Status"];
    const btnName = 'New Customer'

    useEffect(() => {
        fetchUserList();
    })

    const fetchUserList = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/users`);
            if (!response.ok) {
                throw new Error(`Failed to fetch supplier payments list: ${response.status} ${response.statusText}`);
            }
            const user = await response.json();
            const formattedData = user.map(user => [
                user.userId,
                user.userName,
                user.userType,
                user.userStatus,
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
            const userId = data[selectedRowIndex][0];
            const response = await fetch(`${config.BASE_URL}/user/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setData(prevData => prevData.filter((_, index) => index !== selectedRowIndex));
            fetchUserList();
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

export default Users