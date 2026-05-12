import { sanityClient } from './client';

// Query for store settings
export const getStoreSettings = async () => {
  const query = `*[_type == "storeSettings"][0]`;
  return await sanityClient.fetch(query);
};

// Query for products
export const getProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt desc)`;
  return await sanityClient.fetch(query);
};

// Query for featured products
export const getFeaturedProducts = async () => {
  const query = `*[_type == "product" && inStock == true] | order(_createdAt desc)[0...6]`;
  return await sanityClient.fetch(query);
};

// Query for orders (for admin use)
export const getOrders = async () => {
  const query = `*[_type == "order"] | order(createdAt desc)`;
  return await sanityClient.fetch(query);
};

// Query for categories
export const getCategories = async () => {
  const query = `*[_type == "category"] | order(title asc)`;
  return await sanityClient.fetch(query);
};

// Query for hero content
export const getHero = async () => {
  const query = `*[_type == "hero"][0]`;
  return await sanityClient.fetch(query);
};
// Query for a single product by slug
export const getProductBySlug = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    ...,
    sizes,
    category->{
      title,
      slug
    }
  }`;
  return await sanityClient.fetch(query, { slug });
};

export const getProductsByCategory = async (categorySlug: string) => {
  const query = `*[_type == "product" && category->slug.current == $slug] {
    ...,
    category->{
      title,
      slug
    }
  }`;
  return await sanityClient.fetch(query, { slug: categorySlug });
};
