import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
 
  CardBody,
  Input,
} from "@material-tailwind/react";
import axios from "axios";


const ListingIncomplate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
   const [citySearch, setCitySearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");

 

useEffect(() => {
     fetchData() 
}, []);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/googlemap_data");
      const result = response.data;
     
      setData(result|| []);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  

 

  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 px-4">
      <div className="flex justify-end items-center">
        {/* <Typography variant="h4" color="blue-gray">
          Listing Incomplete Data
        </Typography> */}
        <div className="w-56 mr-3">
          <Input
          label="Search City"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          crossOrigin=""
          className="h-12"
          />
        </div>
        <div className="w-56">
          <Input
          label="Search Category"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          crossOrigin=""
          className="h-12"
          />
        </div>                          
                       
      </div>

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 ">
          <Typography variant="h6" color="white">
            Listing Incomplete Data
          </Typography>
          
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loading ? (
            <p className="text-center text-blue-500 font-semibold">Loading...</p>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID","name","address","website","phone number","reviews count","reviews average","category","sub category","city","state","area","created_at"].map((head) => (
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
                      <td className={className}>{item.name}</td>
                      <td className={className}>{item.address}</td>
                      <td className={className}>{item.website}</td>
                      <td className={className}>{item.phone_number}</td>
                      <td className={className}>{item.reviews_count}</td>
                      <td className={className}>{item.reviews_average}</td>
                      <td className={className}>{item.category}</td>
                      <td className={className}>{item.subcategory}</td>
                      <td className={className}>{item.city}</td>
                      <td className={className}>{item.state}</td>
                      <td className={className}>{item.area}</td>
                      <td className={className}>{item.created_at}</td>
                      {/* <td className={className}>
                        <Chip
                          variant="gradient"
                          color="green"
                          value="active"
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      
    </div>
  );
};

export default ListingIncomplate;
