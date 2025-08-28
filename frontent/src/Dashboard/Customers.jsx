import React from "react";

const Customers = () => {
  return (
    <div>
      <h1>Customers Page</h1>
      <div className="p-5 space-y-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="bg-white shadow p-3 rounded">
            Content section {i + 1}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Customers;
