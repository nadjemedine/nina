import { defineSchema } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export const schema = defineSchema({
  name: 'default',
  title: 'Boutique CMS',
  
  // Schema types
  types: schemaTypes,
  
  // Plugins
  plugins: [
    deskTool(),
    visionTool(),
  ],
});
