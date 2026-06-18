import { sanityClient } from './client';

// Query for store settings
export const getStoreSettings = async () => {
  const query = `*[_type == "storeSettings"][0] {
    _id,
    siteTitle,
    siteDescription,
    logo,
    primaryColor,
    currency
  }`;
  return await sanityClient.fetch(query);
};

// Query for products — dereference category so ProductCard and listing pages work
export const getProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    images,
    sizes,
    inStock,
    category->{
      _id,
      title,
      slug
    }
  }`;
  return await sanityClient.fetch(query);
};

// Query for featured products (in stock, latest 6)
export const getFeaturedProducts = async () => {
  const query = `*[_type == "product" && inStock == true] | order(_createdAt desc)[0...6] {
    _id,
    title,
    slug,
    description,
    price,
    images,
    sizes,
    inStock,
    category->{
      _id,
      title,
      slug
    }
  }`;
  return await sanityClient.fetch(query);
};

// Query for orders (for admin use)
export const getOrders = async () => {
  const query = `*[_type == "order"] | order(createdAt desc) {
    _id,
    customerName,
    customerPhone,
    shippingAddress,
    productName,
    size,
    quantity,
    price,
    shippingFee,
    totalAmount,
    status,
    createdAt
  }`;
  return await sanityClient.fetch(query);
};

// Query for categories
export const getCategories = async () => {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }`;
  return await sanityClient.fetch(query);
};

// Query for hero content
export const getHero = async () => {
  const query = `*[_type == "hero"][0] {
    _id,
    title,
    subtitle,
    backgroundImage,
    ctaText,
    ctaLink
  }`;
  return await sanityClient.fetch(query);
};

// Query for a single product by slug
export const getProductBySlug = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    price,
    images,
    sizes,
    inStock,
    category->{
      _id,
      title,
      slug
    }
  }`;
  return await sanityClient.fetch(query, { slug });
};

// Query for products by category slug
export const getProductsByCategory = async (categorySlug: string) => {
  const query = `*[_type == "product" && category->slug.current == $slug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    images,
    sizes,
    inStock,
    category->{
      _id,
      title,
      slug
    }
  }`;
  return await sanityClient.fetch(query, { slug: categorySlug });
};
