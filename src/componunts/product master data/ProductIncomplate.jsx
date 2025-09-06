import { Card, CardBody, CardHeader, Chip, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';

const ProductIncomplate = () => {
   const [loading, setLoading] = useState(false);
   const [currentPage , setCurrentPage] = useState(1)
   const [data , setData] = useState([])
   // Placeholder for data, replace with actual data fetching logic
    // const currentPage = 1; // Placeholder for current page, replace with actual pagination logic
    const totalRecords = 0; // Placeholder for total records, replace with actual data fetching logic
    const limit = 1000; // Placeholder for limit, replace with actual pagination logic
    const totalPages = Math.ceil(totalRecords / limit);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(`https://dashboard.citydealsbazar.com/flask/products/incomplete`);
       
        setData(response.data.data || []);
        // setTotalRecords(result.total_records || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchData();
    },[])


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 px-4">
      {/* <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" color="blue-gray">
          Business Category Data
        </Typography>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Product Incomplate Data
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loading ? (
            <p className="text-center text-blue-500 font-semibold">Loading...</p>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID","ASIN", "Product_name","price","rating","Number_of_ratings","Brand","Seller","category","subcategory","sub_sub_category","category_sub_sub_sub","colour","size_options","description","link","Image_URLs","About_the_items_bullet","Product_details","Additional_Details","Manufacturer_Name","created_at"].map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => {
                  const className = `py-3 px-5 ${
                    idx === data.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={item.id}>
                      <td className={className}>{item.id}</td>
                      <td className={className}>{item.ASIN}</td>
                      <td className={className}>{item.Product_name}</td>
                      <td className={className}>{item.price}</td>
                      <td className={className}>{item.rating}</td>
                      <td className={className}>{item.Number_of_ratings}</td>
                      <td className={className}>{item.Brand}</td>
                      <td className={className}>{item.Seller}</td>
                      <td className={className}>{item.category}</td>
                      <td className={className}>{item.subcategory}</td>
                      <td className={className}>{item.sub_sub_category}</td>
                      <td className={className}>{item.category_sub_sub_sub}</td>
                      <td className={className}>{item.colour}</td>
                      <td className={className}>{item.size_options}</td>
                      <td className={className}>{item.description}</td>
                      <td className={className}>{item.link}</td>
                      <td className={className}>{item.Image_URLs}</td> 
                      <td className={className}>{item.About_the_items_bullet}</td> 
                      <td className={className}>{item.Manufacturer_Name}</td> 
                      <td className={className}>{item.Manufacturer_Name}</td> 
                      <td className={className}>{item.Manufacturer_Name}</td> 
                      <td className={className}>{item.created_at}</td> 
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
        <button
          className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductIncomplate