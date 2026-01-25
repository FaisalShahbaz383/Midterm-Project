import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

const ITEMS_PER_PAGE = 5;

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
      // Move to last page when new customer is added
      setCurrentPage(Math.ceil((customers.length + 1) / ITEMS_PER_PAGE));
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

  // Pagination logic
  const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
          {currentCustomers.map((c) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    margin: "0 5px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      currentPage === page ? "#2563eb" : "#e5e7eb",
                    color:
                      currentPage === page ? "#fff" : "#000",
                  }}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Customers;