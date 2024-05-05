import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InvoiceCreate from '../invoiceCreate';
import './style.css';

const InvoiceList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const saveInvoice = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
    setShowCreateForm(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const results = invoices.filter((invoice) =>
      invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="full-page">
      <div className="main-page">
        <div className="invo">
          <h1>INVOICE</h1>
        </div>
        <div className="search">
          <Button onClick={handleCreateButtonClick}>Create</Button>
          <Input
            className="input-sea"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={resetSearch}>Reset</Button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Total</th>
              <th>Tax</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {(searchTerm ? searchResults : invoices).map((invoice) => (
              <tr key={invoice.invoiceNo}>
                <td>{invoice.invoiceNo}</td>
                <td>{invoice.date}</td>
                <td>{invoice.customerName}</td>
                <td>{invoice.total}</td>
                <td>{invoice.tax}</td>
                <td>{invoice.grandTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateForm && <InvoiceCreate onSave={saveInvoice} />}
    </div>
  );
};

export default InvoiceList;
