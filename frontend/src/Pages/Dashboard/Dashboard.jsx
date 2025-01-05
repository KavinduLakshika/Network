import SideBar from "../../Components/SideBar/SideBar"

function Dashboard() {
    return (
        <div className='d-flex'>
            <SideBar/>
            <div className="flex-grow-1 p-3">
                <h2>Dashboard</h2>
            </div>
        </div>
    )
}

export default Dashboard