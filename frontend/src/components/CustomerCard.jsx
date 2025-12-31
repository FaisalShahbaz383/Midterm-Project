const CustomerCard = ({
  c,
  users,
  handleStatusChange,
  updateCustomer,
  handleDelete,
}) => {
  return (
    <div className="customer-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {/* CUSTOMER INFO */}
      <p>
        <strong>{c.name}</strong> ({c.email})
      </p>

      {/* STATUS */}
      <p>Status: {c.status}</p>

      {/* ASSIGNED USER */}
      <p>
        Assigned To: {c.assignedTo ? c.assignedTo.name : "Unassigned"}
      </p>

      {/* UPDATE STATUS */}
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

      {/* ASSIGN USER */}
      <select
        value={c.assignedTo?._id || ""}
        onChange={(e) =>
          updateCustomer(c._id, { assignedTo: e.target.value })
        }
        style={{ marginLeft: "10px" }}
      >
        <option value="">Unassigned</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* DELETE */}
      <button
        onClick={() => handleDelete(c._id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
};

export default CustomerCard;