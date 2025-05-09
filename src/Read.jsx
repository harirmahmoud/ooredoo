import React, { useState } from 'react';
import Data from './Data';
import * as XLSX from 'xlsx';

import axios from 'axios';
import { useNavigate } from 'react-router';

const Read = () => {
  const [excelData, setExcelData] = useState([]);
  const [info,setInfo]=useState([])

  
  const [File,setFile]=useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file)

    if (file && !file.name.endsWith('.xlsx')) {
      alert('Please upload a .xlsx file only.');
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const allData = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet);
        allData.push(...sheetData);
      });

      setExcelData(allData);
      console.log(allData)
      axios.post('https://ooredooback.onrender.com/insert',allData).then(res=>console.log(res)).catch(e=>console.log(e))
    };

    reader.readAsArrayBuffer(file);
  };
 
const nav=useNavigate()
  return (
    <div className="p-4">
      <div className='flex justify-between px-6'>
        <h2 className="text-xl font-bold mb-4">Upload and Read Excel File</h2>
        <button
        onClick={()=>{nav('/show')}}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"

      >
       View All
      </button>
      </div>
      

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 mb-6"
      />
      


      {excelData.length > 0 && (
        <div>
 <div className="overflow-auto max-h-[500px] border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Data from Excel:</h3>
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key} className="border border-gray-300 px-3 py-2 text-left font-medium">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50">
                  {Object.values(row).map((value, j) => (
                    <td key={j} className="border border-gray-300 px-3 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> 
         
         
        </div>
          <div className='my-50'>
             <Data file={File}  info={info} setInfo={setInfo}/>
          </div>

        </div>
       
      )}
    </div>
  );
};

export default Read;
