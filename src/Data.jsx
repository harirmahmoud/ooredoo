import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Toaster } from "mui-sonner"
import { toast } from "mui-sonner";



const Data = ({info,setInfo,File}) => {
    const [data,setdata]=useState({
        Site_name:null,
        FarEnd:null,
        HBA:null,
        Nombre_anternne:null,
        Anternne:null,
        longitude:null,
        latitude:null,
        Elevation:null,
        addresse:null,
        building_heigh:null,
        tower_high:null,
        site_type:null,
        site_state:null,

    })
  const [empty,setempty]=useState(false)
  const hanldeClick = () => {
    const values = Object.values(data);
    const hasEmpty = values.some(val => val === null || val === "");
  
    if (hasEmpty) {
      setempty(true);
      alert("Fill all fields correctly!");
    } else {
      setempty(false);
      axios.post('https://ooredooback.onrender.com/new', data)
        .then(res => {console.log(res);toast.success("created sucessfuly")})
        .catch(e => {console.log(e);toast.error("error in the sever !")});
    }
  
    console.log("hi");
  };
  
    return (
        <div>
           <Toaster position="top-center" />
            <div className="overflow-auto max-h-[500px] border rounded-lg">
                <div className='flex justify-between'>
                     <h3 className="text-lg font-semibold mb-2">Add new Data Excel:</h3>
          <button onClick={hanldeClick} className='bg-blue-500 text-teal-50 rounded-xl m-3 w-30 h-10 hover:bg-blue-600'>Add</button>
                </div>
         
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
               
              <tr>
              
                  {
                    Object.keys(data).map((key)=>(
                         <th key={key}  className="border border-gray-300 px-3 py-2 text-left font-medium">
                    {key}
                  </th>
                    ))
                }
          
              </tr>
            </thead>
            <tbody>
              
                <tr  className="odd:bg-white even:bg-gray-50">
                 
                {Object.keys(data).map((key) => (
                <td key={key} className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    name={key}
                    required
                    value={data[key]}
                    onChange={(e)=>{  const { name, value } = e.target;
                    setdata((prev) => ({
                      ...prev,
                      [name]: value
                    }));}}
                    className="w-full border border-gray-200 rounded px-2 py-1"
                  />
                </td>
              ))}
                 
                </tr>
             
            </tbody>
          </table>
        </div>
        </div>
    );
}

export default Data;
