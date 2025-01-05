import { useState } from "react";
import Table from "../../Components/Table";
import SideBar from "../../Components/SideBar/SideBar";

function Customers() {
    const [data, setData] = useState([
        ["John Doe", "johndoe@example.com", "Admin"],
        ["Jane Smith", "janesmith@example.com", "Editor"],
        ["Mike Brown", "mikebrown@example.com", "Viewer"],
    ]);

    const columns = ["Name", "Email", "Role"];

    const handleAdd = () => {
        const newRow = ["New User", "newuser@example.com", "Role"];
        setData([...data, newRow]);
    };

    const handleEdit = (row) => {
        const updatedData = data.map((item) =>
            item === row ? ["Edited User", "edited@example.com", "Updated Role"] : item
        );
        setData(updatedData);
        alert(`Edited: ${row.join(", ")}`);
    };

    const handleDelete = (row) => {
        const updatedData = data.filter((item) => item !== row);
        setData(updatedData);
        alert(`Deleted: ${row.join(", ")}`);
    };

    return (
        <div className='d-flex'>
            <SideBar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Customers List</h2>
                <Table
                    data={data}
                    columns={columns}
                    onAdd={handleAdd}
                    btnName="Add Row"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export default Customers