import React, { useState } from 'react'; 
import { supabase } from '../createClient'; 

const PawnerDetails = ({ onSubmit }) => { 
  const [pawnerData, setPawnerData] = useState({ 
    serial_no: '', 
    name: '', 
    relation: '', 
    relation_name: '', 
    address: '', 
    phone_no: '', 
    date: '', 
    amount_no: '', 
    amount_words: '' 
  }); 
  
  const [collateralData, setCollateralData] = useState({ 
    jewel_name: '', 
    jewel_seal: '', 
    jewel_quantity: '', 
    jewel_weight: '', 
    total_quantity: '', 
    total_weight: '' 
  }); 
  
  const handlePawnerChange = (e) => { 
    const { name, value } = e.target; 
    setPawnerData((prevData) => ({ ...prevData, [name]: value })); 
  }; 
  
  const handleCollateralChange = (e) => { 
    const { name, value } = e.target; 
    setCollateralData((prevData) => ({ ...prevData, [name]: value })); 
  }; 
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
  
    // Insert pawner data
    const { data: pawnerInsertedData, error: pawnerError } = await supabase
      .from('LoanBuyerDetails')
      .insert([pawnerData])
      .select();
  
    // Log the insertion result
    console.log('Pawner Insert Response:', pawnerInsertedData, pawnerError);
  
    if (pawnerError) { 
      console.error('Error occurred while inserting pawner data:', pawnerError); 
      return; 
    } 
  
    // Check if pawnerInsertedData is null or empty
    if (!pawnerInsertedData || pawnerInsertedData.length === 0) {
      console.error('Pawner insertion returned no data.');
      return;
    }
  
    // Inserting collateral data with reference to the inserted pawner
    const { data: collateralInsertedData, error: collateralError } = await supabase
      .from('CollateralDetails') // Assuming you have a separate table for collateral
      .insert([{ 
        pawner_id: pawnerInsertedData[0].id, // Reference to the inserted pawner
        ...collateralData 
      }]); 
  
    if (collateralError) { 
      console.error('Error occurred while inserting collateral data:', collateralError); 
    } else { 
      console.log('Inserted Successfully', { pawnerInsertedData, collateralInsertedData }); 
    } 
  };
  ; 

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
    {/* Input fields for pawnerData */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serial_no">Serial No</label>
      <input type="text" name="serial_no" value={pawnerData.serial_no} onChange={handlePawnerChange} placeholder="Serial No" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
      <input type="text" name="name" value={pawnerData.name} onChange={handlePawnerChange} placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relation">Relation</label>
      <input type="text" name="relation" value={pawnerData.relation} onChange={handlePawnerChange} placeholder="Relation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relation_name">Relation Name</label>
      <input type="text" name="relation_name" value={pawnerData.relation_name} onChange={handlePawnerChange} placeholder="Relation Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
      <input type="text" name="address" value={pawnerData.address} onChange={handlePawnerChange} placeholder="Address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_no">Phone No</label>
      <input type="text" name="phone_no" value={pawnerData.phone_no} onChange={handlePawnerChange} placeholder="Phone No" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
      <input type="date" name="date" value={pawnerData.date} onChange={handlePawnerChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount_no">Amount No</label>
      <input type="number" name="amount_no" value={pawnerData.amount_no} onChange={handlePawnerChange} placeholder="Amount No" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount_words">Amount Words</label>
      <input type="text" name="amount_words" value={pawnerData.amount_words} onChange={handlePawnerChange} placeholder="Amount Words" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    {/* Input fields for collateralData */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jewel_name">Jewel Name</label>
      <input type="text" name="jewel_name" value={collateralData.jewel_name} onChange={handleCollateralChange} placeholder="Jewel Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jewel_seal">Jewel Seal</label>
  <select
    name="jewel_seal"
    value={collateralData.jewel_seal}
    onChange={handleCollateralChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select Jewel Seal</option>
    <option value="gold">Gold</option>
    <option value="silver">Silver</option>
  </select>
</div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jewel_quantity">Jewel Quantity</label>
      <input type="number" name="jewel_quantity" value={collateralData.jewel_quantity} onChange={handleCollateralChange} placeholder="Jewel Quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jewel_weight">Jewel Weight</label>
      <input type="number" name="jewel_weight" value={collateralData.jewel_weight} onChange={handleCollateralChange} placeholder="Jewel Weight" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_quantity">Total Quantity</label>
      <input type="number" name="total_quantity" value={collateralData.total_quantity} onChange={handleCollateralChange} placeholder="Total Quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_weight">Total Weight</label>
      <input type="number" name="total_weight" value={collateralData.total_weight} onChange={handleCollateralChange} placeholder="Total Weight" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
  </form>
  ); 
};

export default PawnerDetails;
