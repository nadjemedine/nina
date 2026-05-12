import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './lib/sanity/schemaTypes';

export default defineConfig({
  name: 'boutique',
  title: 'Boutique CMS',
  basePath: '/studio',

  projectId: 'w4s1gp5f',
  dataset: 'production',

  plugins: [
    deskTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
