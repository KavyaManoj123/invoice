import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from 'react-modal';
import './style.css';

const InvoiceCreate = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');

  const items = [
    { id: 1001, name: 'Colgate', price: 20, tax: 5.0 },
    { id: 1002, name: 'Sugar', price: 45, tax: 5.0 },
    { id: 1003, name: 'Milk', price: 25, tax: 5.0 },
    { id: 1004, name: 'Soap', price: 30, tax: 5.0 },
    { id: 1005, name: 'Notebook', price: 35, tax: 5.0 },
  ];

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setIsModalOpen(false);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalTax = () => {
    return selectedItems.reduce(
      (totalTax, item) => totalTax + (item.price * item.tax) / 100,
      0
    );
  };

  const calculateGrandTotal = () => {
    const totalPrice = calculateTotalPrice();
    const totalTax = calculateTotalTax();
    return totalPrice + totalTax;
  };

  const handleSaveInvoice = () => {
    const newInvoice = {
      invoiceNo,
      date,
      customerName,
      total: calculateTotalPrice(),
      tax: calculateTotalTax(),
      grandTotal: calculateGrandTotal(),
    };

    onSave(newInvoice);
  };

  return (
    <div className="invoice-create">
      <p>Create Invoice</p>
      <div className="no-date">
        <label>Invoice No:</label>
        <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
        <label>Date:</label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Customer Name:</label>
        <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </div>
      <Button onClick={() => setIsModalOpen(true)}>ADD</Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Item"
        className="modal"
      >
        <h2>Select Item</h2>
        <table>
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Tax (%)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.tax}%</td>
                <td>
                  <Button onClick={() => handleAddItem(item)}>Add</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </Modal>

      <table>
        <thead>
          <tr>
            <th>Item Id</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Tax (%)</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.tax}%</td>
              <td>{(item.price * (1 + item.tax / 100)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <div className="ttl-tp">
          <label>Total Price:</label>
          <Input value={calculateTotalPrice()} readOnly />
        </div>
        <div className="ttl-tt">
          <label>Total Tax:</label>
          <Input value={calculateTotalTax().toFixed(2)} readOnly />
        </div>
        <div className="ttl-gt">
          <label>Grand Total:</label>
          <Input value={calculateGrandTotal().toFixed(2)} readOnly />
        </div>
      </div>

      <Button onClick={handleSaveInvoice}>SAVE</Button>
    </div>
  );
};

export default InvoiceCreate;
