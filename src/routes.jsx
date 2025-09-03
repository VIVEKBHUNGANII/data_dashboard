import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import BusinessCategory from "./componunts/masterdata/BusinessCategory";
import ServiceCategory from "./componunts/masterdata/ServiceCategory";
import ProductCategory from "./componunts/masterdata/ProductCategory";
import ListingComplate from "./componunts/listing master data/ListingComplate";
import ListingIncomplate from "./componunts/listing master data/ListingIncomplate";
import Country from "./componunts/masterdata/location msater/Country";
import ProductComplate from "./componunts/product master data/ProductComplate";
import ProductIncomplate from "./componunts/product master data/ProductIncomplate";
import ServiceComplate from "./componunts/service master data/ServiceComplate";
import ServiceIncomplate from "./componunts/service master data/ServiceIncomplate";
import GoogleMapScrapper from "./componunts/scrapper/GoogleMapScrapper";
import ItemDataImport from "./componunts/data import/ItemDataImport";
import ProductDataImport from "./componunts/data import/ProductDataImport";
import Dasboard2 from "./componunts/Dasboard2";
import ListingDataReport from "./componunts/ListingDataReport";
import ProductDataReport from "./componunts/ProductDataReport";
import MisReportTable from "./componunts/Misreport";
import { element } from "prop-types";
import AmazonScraper from "./componunts/scrapper/AmazonScrapper";
import PendingData from "./componunts/listing master data/PendingData";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        path:"/listingdata-report",
        element: <MisReportTable ></MisReportTable>, 
        hidden: true, // Hide this from the sidebar
      },
      {
        path:"/productdata-report",
        element: <ProductDataReport />, 
        hidden: true, // Hide this from the sidebar
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home2",
        element: <Dasboard2 />,
      },
      {
        icon: <ArrowUpTrayIcon {...icon} />,
        name: "Data Imports",
        children: [
          {
            icon: <DocumentTextIcon {...icon} />,
            name: "Items Data",
            path: "/data-imports/items-data",
            element: <ItemDataImport />, // Placeholder for Items Data page
          },{
            icon: <DocumentTextIcon {...icon} />,
            name: "Product Data",
            path: "/data-imports/product-data",
            element: <ProductDataImport />, // Placeholder for Product Data page
          },
        ] 
      },
      {
        icon: <TableCellsIcon {...icon} />, // <-- Changed to TableCellsIcon for data representation
        name: "Master data",
        children: [
          {
            icon: <TableCellsIcon {...icon} />,
            name: "Location Master",
            children: [
              {
                icon: <TableCellsIcon {...icon} />,
                name: "Country",
                path: "/masterdata/location/country",
                element:<Country />,
              },
              {
                icon: <TableCellsIcon {...icon} />,
                name: "State",
                path: "/masterdata/location/state",
                element:<Country />,
              },
              {
                icon: <TableCellsIcon {...icon} />,
                name: "City",
                path: "/masterdata/location/city",
                element:<Country />,
              },
              {
                icon: <TableCellsIcon {...icon} />,
                name: "Area",
                path: "/masterdata/location/area",
                element:<Country />,
              },
            ]
          },
          {
            icon: <TableCellsIcon {...icon} />,
            name: "Business Category",
            path: "/masterdata/business-category",
            element:<BusinessCategory />,
          },
          {
            icon: <TableCellsIcon {...icon} />,
            name: "Service Category",
            path: "/masterdata/service-category",
            element: <ServiceCategory />,
          },
          {
            icon: <TableCellsIcon {...icon} />,
            name: "Product Category",
            path: "/masterdata/product-category",
            element: <ProductCategory />,
          }
        ]},
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Listing Mster Data",
        children: [
          {
            icon:<CheckCircleIcon {...icon} />,
            name: "Complete Data",
            path: "listing-master-data/complete-data",
            element: <ListingComplate/>,
         },
          {
            icon: <XCircleIcon {...icon} />,
            name: "Incomplete Data",
            path: "listing-master-data/incomplete-data",
            element: <ListingIncomplate/>,
         },
          {
            icon: <XCircleIcon {...icon} />,
            name: "Pending Data",
            path: "listing-master-data/pending-data",
            element: <PendingData/>,
         },
        ]},
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Product Mster Data",
        children: [
          {
            icon: <CheckCircleIcon {...icon} />,
            name: "Complete Data",
            path: "product-master-data/complete-data",
            element:<ProductComplate/>,
         },
          {
            icon: <XCircleIcon {...icon} />,
            name: "Incomplete Data",
            path: "product-master-data/incomplete-data",
            element: <ProductIncomplate/>,
         },
        ]
      },
    {
        icon: <TableCellsIcon {...icon} />,
        name: "Service Mster Data",
        children: [
          {
            icon: <CheckCircleIcon {...icon} />,
            name: "Complete Data",
            path: "service-master-data/complete-data",
            element: <ServiceComplate/>,
         },
          {
            icon: <XCircleIcon {...icon} />,
            name: "Incomplete Data",
            path: "service-master-data/incomplete-data",
            element: <ServiceIncomplate/>,
         },
        ]
    },
      {
        icon:<MagnifyingGlassIcon {...icon} />,
        name: "Scrapper",
        children: [
          {
            icon:  <MapPinIcon {...icon} />,
            name: "Google Map",
            path: "/scrapper/google-map",
            element: <GoogleMapScrapper />,
          },
          {
            icon:  <ShoppingCartIcon {...icon} />,
            name: "Amazon",
            path:"/scrapper/amazon",
            element:<AmazonScraper/>
          }
        ]
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },

  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
