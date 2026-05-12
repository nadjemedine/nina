import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'w4s1gp5f',
  dataset: 'production',
  apiVersion: '2023-08-01', // Use a stable API version
  useCdn: false, // Set to true for production usage
  token: 'skcMBbI3WkwneicJLnqwIUiNuFoaKWpp6a1JVC5jMpWl7JGuNweUpKanvWndmpQDZZSBlw2MCrlmKA2jgGyVTzMiotyCjlDHBEMkn0RTTkLdsI5pne4YnLx35OP9Qa6eAgD8okVgeIXTjb9G6kshevkyQnvCtyNBVmoOcGjT8MXNcobjJYjt',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  try {
    if (!source || (typeof source === 'object' && !source.asset && !source._ref)) {
      return { url: () => '' };
    }
    return builder.image(source);
  } catch (error) {
    console.error('Error resolving image URL:', error);
    return { url: () => '' };
  }
}

// Optional: Create a client for preview mode (if needed)
export const previewClient = createClient({
  projectId: 'w4s1gp5f',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
  token: 'skcMBbI3WkwneicJLnqwIUiNuFoaKWpp6a1JVC5jMpWl7JGuNweUpKanvWndmpQDZZSBlw2MCrlmKA2jgGyVTzMiotyCjlDHBEMkn0RTTkLdsI5pne4YnLx35OP9Qa6eAgD8okVgeIXTjb9G6kshevkyQnvCtyNBVmoOcGjT8MXNcobjJYjt',
  ignoreBrowserTokenWarning: true,
});
