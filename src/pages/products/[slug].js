// pages/products/[slug].js

import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch a list of product slugs from an API or database
  const productSlugs = ['product-1', 'product-2', 'product-3']; // Replace with your actual data

  // Map the slugs to an array of objects with `params` field
  const paths = productSlugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // Set to true if you want to handle unknown slugs dynamically
  };
}

export async function getStaticProps({ params }) {
  // Fetch product data based on the slug from an API or database
  // Replace this with your actual data retrieval logic
  const productData = {
    slug: params.slug,
    name: 'Sample Product',
    description: 'This is a sample product description.',
    price: 19.99,
  };

  return {
    props: {
      product: productData,
    },
  };
}

export default ProductDetail;
