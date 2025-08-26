import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const AmazonScraper = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!searchTerm) {
      setError("Search term is required");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/scrape_amazon", {
        search_term: searchTerm,
        pages: pages,
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-center  bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardBody className="space-y-4">
          <Typography variant="h5" color="blue-gray">
            Amazon Scraper
          </Typography>

          <Input
            label="Search Term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Input
            label="Number of Pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />

          <Button
            onClick={handleScrape}
            fullWidth
            disabled={loading}
            className="bg-blue-600"
          >
            {loading ? "Scraping..." : "Start Scraping"}
          </Button>

          {error && (
            <Typography color="red" className="text-sm">
              {error}
            </Typography>
          )}

          {result && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <Typography className="text-sm">
                ✅ Inserted: {result.inserted}
              </Typography>
              <Typography className="text-sm">
                🔍 Scraped: {result.scraped}
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AmazonScraper;
