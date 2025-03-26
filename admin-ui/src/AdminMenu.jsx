import { useEffect, useState } from "react";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "./menuService";
import "./AdminMenu.css";

const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newMenuItem, setNewMenuItem] = useState({ name: "", description: "", price: "", imageUrl: "" });

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        const response = await getMenuItems();
        setMenuItems(response.data);
    };

    const handleInputChange = (e) => {
        setNewMenuItem({ ...newMenuItem, [e.target.name]: e.target.value });
    };

    const handleAddMenuItem = async () => {
        await createMenuItem(newMenuItem);
        fetchMenuItems();
        setNewMenuItem({ name: "", description: "", price: "", imageUrl: "" });
    };

    const handleEditMenuItem = async (id) => {
        const item = menuItems.find((m) => m.id === id);
        const updatedName = prompt("Update Name:", item.name);
        const updatedDescription = prompt("Update Description:", item.description);
        const updatedPrice = prompt("Update Price:", item.price);
        const updatedImage = prompt("Update Image URL:", item.imageUrl);

        if (updatedName && updatedDescription && updatedPrice && updatedImage) {
            await updateMenuItem(id, {
                name: updatedName,
                description: updatedDescription,
                price: parseFloat(updatedPrice),
                imageUrl: updatedImage,
            });
            fetchMenuItems();
        }
    };

    const handleDeleteMenuItem = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteMenuItem(id);
            fetchMenuItems();
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-center mb-4"><strong>Refresh Beach Admin</strong></h2>

        {/* Add New Menu Item Form */}
        <div className="card shadow p-4 mb-4">
            <h4 className="mb-3"><strong>Add New Menu Item</strong></h4>
            <div className="row g-3">
                <div className="col-md-3">
                    <input type="text" name="name" value={newMenuItem.name} onChange={handleInputChange} className="form-control" placeholder="Food Name" required />
                </div>
                <div className="col-md-3">
                    <input type="text" name="description" value={newMenuItem.description} onChange={handleInputChange} className="form-control" placeholder="Description" required />
                </div>
                <div className="col-md-2">
                    <input type="number" name="price" value={newMenuItem.price} onChange={handleInputChange} className="form-control" placeholder="Price" required />
                </div>
                <div className="col-md-3">
                    <input type="text" name="imageUrl" value={newMenuItem.imageUrl} onChange={handleInputChange} className="form-control" placeholder="Image URL" required />
                </div>
                <div className="col-md-1">
                    <button onClick={handleAddMenuItem} className="btn btn-success w-100">Add</button>
                </div>
            </div>
        </div>

        {/* List of Menu Items */}
        <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.imageUrl} alt="Food" width="50" className="rounded shadow-sm" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.price}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditMenuItem(item.id)}>Update</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default AdminMenu;
