import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

const ListingIncomplate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage, citySearch, categorySearch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dashboard.citydealsbazar.com/flask/items/incomplete?page=${currentPage}&limit=${rowsPerPage}`
      );
      const result = response.data;

      let filtered = result.items || [];

      // --- Frontend filter on city & category ---
      filtered = filtered.filter((item) => {
        const cityMatch = citySearch
          ? item.city?.toLowerCase().includes(citySearch.toLowerCase())
          : true;
        const categoryMatch = categorySearch
          ? item.category?.toLowerCase().includes(categorySearch.toLowerCase())
          : true;
        return cityMatch && categoryMatch;
      });

      setData(filtered);
      setTotalPages(result.pages);
      setTotalCount(result.total); // ✅ from backend
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 px-4">
      {/* Search Inputs */}
      <div className="flex justify-end items-center">
        <div className="w-56 mr-3">
          <Input
            label="Search City"
            value={citySearch}
            onChange={(e) => {
              setCitySearch(e.target.value);
              setCurrentPage(1); // reset to first page
            }}
            crossOrigin=""
            className="h-12"
          />
        </div>
        <div className="w-56">
          <Input
            label="Search Category"
            value={categorySearch}
            onChange={(e) => {
              setCategorySearch(e.target.value);
              setCurrentPage(1); // reset to first page
            }}
            crossOrigin=""
            className="h-12"
          />
        </div>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex">
          <Typography variant="h6" color="white">
            Listing Incomplete Data
          </Typography>
          <Typography variant="h6" color="white" className="ml-auto">
            Total: {totalCount} {/* ✅ backend total count */}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loading ? (
            <p className="text-center text-blue-500 font-semibold">Loading...</p>
          ) : (
            <div>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "name",
                      "address",
                      "category",
                      "sub category",
                      "city",
                      "area",
                      "state",
                      "phone_no_1",
                      "phone_no_2",
                      "phone_no_3",
                      "ratings",
                      "source",
                      "country",
                      "email",
                      "latitude",
                      "longitude",
                      "reviews",
                      "facebook_url",
                      "twitter_url",
                      "linkedin_url",
                      "description",
                      "pincode",
                      "virtual_phone_no",
                      "whatsapp_no",
                      "avg_spent",
                      "cost_for_two",
                    ].map((head) => (
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
                  {data.length > 0 ? (
                    data.map((item, idx) => {
                      const className = `py-3 px-5 ${
                        idx === data.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={item.name}>
                          <td className={className}>{item.name}</td>
                          <td className={className}>{item.address}</td>
                          <td className={className}>{item.category}</td>
                          <td className={className}>{item.sub_category}</td>
                          <td className={className}>{item.city}</td>
                          <td className={className}>{item.area}</td>
                          <td className={className}>{item.state}</td>
                          <td className={className}>{item.phone_no_1}</td>
                          <td className={className}>{item.phone_no_2}</td>
                          <td className={className}>{item.phone_no_3}</td>
                          <td className={className}>{item.ratings}</td>
                          <td className={className}>{item.source}</td>
                          <td className={className}>{item.country}</td>
                          <td className={className}>{item.email}</td>
                          <td className={className}>{item.latitude}</td>
                          <td className={className}>{item.longitude}</td>
                          <td className={className}>{item.reviews}</td>
                          <td className={className}>{item.facebook_url}</td>
                          <td className={className}>{item.twitter_url}</td>
                          <td className={className}>{item.linkedin_url}</td>
                          <td className={className}>{item.description}</td>
                          <td className={className}>{item.pincode}</td>
                          <td className={className}>{item.virtual_phone_no}</td>
                          <td className={className}>{item.whatsapp_no}</td>
                          <td className={className}>{item.avg_spent}</td>
                          <td className={className}>{item.cost_for_two}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="26"
                        className="text-center py-4 text-red-500 font-semibold"
                      >
                        No matching results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalCount > 0 && (
                <div className="flex justify-between items-center mt-4 px-4">
                  <Button
                    size="sm"
                    variant="outlined"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Typography variant="small" className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ListingIncomplate;
