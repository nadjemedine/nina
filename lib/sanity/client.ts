import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Use the same project ID as the Studio (sanity.config.ts)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'w4s1gp5f';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-08-01',
  useCdn: false, // Disable CDN to always get fresh data from Sanity
  token: process.env.SANITY_API_TOKEN || 'skcMBbI3WkwneicJLnqwIUiNuFoaKWpp6a1JVC5jMpWl7JGuNweUpKanvWndmpQDZZSBlw2MCrlmKA2jgGyVTzMiotyCjlDHBEMkn0RTTkLdsI5pne4YnLx35OP9Qa6eAgD8okVgeIXTjb9G6kshevkyQnvCtyNBVmoOcGjT8MXNcobjJYjt',
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
