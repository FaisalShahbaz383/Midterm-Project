import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Failed to load customers");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer({ name, email });
      setName("");
      setEmail("");
      loadCustomers();
    } catch {
      alert("Failed to create customer");
    }
  };

  const handleStatusChange = async (id, status) => {
    await updateCustomer(id, { status });
    loadCustomers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await deleteCustomer(id);
    loadCustomers();
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <>
      <Navbar />

      <div className="app-container">
        <h2 className="page-title">Customers</h2>

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

        <div className="customer-list">
          {customers.map((c) => (
            <div key={c._id} className="customer-card">
              <p>
                <strong>{c.name}</strong> ({c.email})
              </p>

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