import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        console.log('API Response:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the data', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    // Prepare data for the worksheet
    const header = ["ID", "Name", "Username", "Email"];
    const worksheetData = [header, ...data.map(item => [item.id, item.name, item.username, item.email])];
    
    // Create a worksheet from the data array
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Apply styles to the header row
    const headerColor = "4dc4d1";
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ c: C, r: 0 });
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: headerColor } } // Header color
      };
    }
  
    // Apply styles to the data rows
    const colors = ["faf49b", "f2efc4"];
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      const color = colors[(R - range.s.r - 1) % colors.length];
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ c: C, r: R });
        if (!worksheet[address]) continue;
        worksheet[address].s = {
          alignment: { horizontal: "left", vertical: "center" },
          fill: { fgColor: { rgb: color } } // Row color
        };
      }
    }
  
    // Set column widths
    worksheet['!cols'] = [
      { wch: 5 },  // ID column
      { wch: 20 }, // Name column
      { wch: 20 }, // Username column
      { wch: 30 }  // Email column
    ];
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "UsersData");
  
    // Write the Excel file and download it
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };
  
  
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{marginTop:"90px"}}>
      <h1>Users Data Table</h1>
      <button onClick={exportToExcel}>Export to Excel</button>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
