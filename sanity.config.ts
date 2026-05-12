import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './lib/sanity/schemaTypes';

export default defineConfig({
  name: 'boutique',
  title: 'Boutique CMS',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lphg65n6',
  dataset: 'production',

  plugins: [
    structureTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
