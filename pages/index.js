import React, { useEffect } from "react";
import axios from "axios";

function Home({ products }) {
  console.log(products);

  return <>home</>;
}

Home.getInitialProps = async () => {
  // fetch data on server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);

  return { products: response.data };
  // this  object will be merged with existing props
};

export default Home;
