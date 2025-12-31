import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers } from "../api/userApi";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const loadCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomer({ name, email });
    setName("");
    setEmail("");
    loadCustomers();
  };

  const handleStatusChange = async (id, status) => {
    await updateCustomer(id, { status });
    loadCustomers();
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadCustomers();
  };

  useEffect(() => {
    loadCustomers();
    getUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="app-container">
        <h2 className="page-title">Customers</h2>

        {/* CREATE CUSTOMER */}
        <form className="customer-form" onSubmit={handleSubmit}>
          <input
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Customer Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Add Customer</button>
        </form>

        <hr />

        {/* CUSTOMER LIST */}
        <div className="customer-list">
          {customers.map((c) => (
            <div key={c._id} className="customer-card">
              <p>
                <strong>{c.name}</strong> ({c.email})
              </p>

              <p>Status: {c.status}</p>

              <select
                value={c.status}
                onChange={(e) =>
                  handleStatusChange(c._id, e.target.value)
                }
              >
                <option>New</option>
                <option>Contacted</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>

              <button onClick={() => handleDelete(c._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Customers;