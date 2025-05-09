import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useNavigate } from 'react-router';

const Show = () => {
  const [data, setdata] = useState([]);
  const tableRef = useRef(null); // Ref to your table

  useEffect(() => {
    axios
      .get('https://ooredooback.onrender.com/select')
      .then((res) => setdata(res.data))
      .catch((e) => console.log(e));
  }, []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'ExcelData',
    sheet: 'DataSheet',
  });
  const nav=useNavigate()


  return (
    <div>
        <div className='flex justify-between p-6'> 
            <button
        onClick={onDownload}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Export to Excel
      </button>
      <button
        onClick={()=>{nav('/')}}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"

      >
       go back
      </button>

        </div>
      

      <div className="overflow-auto max-h-[500px] border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Data from Excel:</h3>
        {data.length > 0 && (
          <table
            ref={tableRef}
            className="min-w-full table-auto border-collapse border border-gray-300 text-sm"
          >
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 px-3 py-2 text-left font-medium"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
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
        )}
      </div>
    </div>
  );
};

export default Show;
