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
import { downloadCSV } from "@/utils/Itemcsvdownload";

const DuplicateData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const rowsPerPage = 25; // per page rows count

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dashboard.citydealsbazar.com/flask/items/duplicates?page=${currentPage}&limit=${rowsPerPage}`
      );

      setData(response.data.items || []);
      setTotalPages(response.data.total_pages || 1);
      setTotalItems(response.data.total || 0);
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
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-4 flex items-center justify-between"
        >
          <Typography variant="h6" color="white">
            Listing Duplicate Data
          </Typography>

          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              color="white"
              className="flex items-center gap-2"
              onClick={() => downloadCSV("duplicates")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Download Csv
            </Button>

            <Typography variant="h6" color="white">
              Total: {totalItems}
            </Typography>
          </div>
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
                      "id",
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
                        <tr key={item.id || idx}>
                          <td className={className}>{item.id}</td>
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
              {data.length > 0 && (
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

export default DuplicateData;
