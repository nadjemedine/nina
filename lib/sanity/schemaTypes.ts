import { defineType, defineField } from 'sanity';

// Store Settings Schema
export const storeSettings = defineType({
  name: 'storeSettings',
  title: 'Paramètres du magasin',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Titre du site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description du site',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Couleur principale',
      type: 'string',
      description: 'Code hexadécimal de la couleur principale (ex: #4A5D23)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Devise',
      type: 'string',
      initialValue: 'DA',
      options: {
        list: [
          { title: 'DA (Dinars Algériens)', value: 'DA' },
          { title: 'USD ($)', value: 'USD' },
          { title: 'EUR (€)', value: 'EUR' },
        ],
      },
    }),
  ],
});

// Product Schema
export const product = defineType({
  name: 'product',
  title: 'Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'Images du produit',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Ajoutez plusieurs images pour montrer les détails du produit.',
    }),
    defineField({
      name: 'sizes',
      title: 'Tailles et Stock',
      description: 'Gérez le stock pour chaque taille spécifique.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sizeStock',
          fields: [
            { name: 'size', title: 'Taille', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'quantity', title: 'Quantité en stock', type: 'number', validation: (Rule) => Rule.required().min(0) },
          ],
          preview: {
            select: {
              title: 'size',
              subtitle: 'quantity',
            },
            prepare({ title, subtitle }) {
              return {
                title: `Taille: ${title}`,
                subtitle: `${subtitle} en stock`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'En stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});

// Category Schema
export const category = defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});

// Hero Schema
export const hero = defineType({
  name: 'hero',
  title: 'Bannière (Hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte du bouton',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton',
      type: 'string',
    }),
  ],
});

// Order Schema
export const order = defineType({
  name: 'order',
  title: 'Commande',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Numéro de commande',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'customerName',
      title: 'Nom du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email du client',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Téléphone du client',
      type: 'string',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Adresse de livraison',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', title: 'ID du produit', type: 'string' },
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'quantity', title: 'Quantité', type: 'number', initialValue: 1 },
            { name: 'price', title: 'Prix', type: 'number' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'totalAmount',
      title: 'Montant total',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'En attente', value: 'pending' },
          { title: 'Confirmée', value: 'confirmed' },
          { title: 'Expédiée', value: 'shipped' },
          { title: 'Livré', value: 'delivered' },
          { title: 'Annulée', value: 'cancelled' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
});

// Export all schema types
export const schemaTypes = [
  storeSettings,
  product,
  category,
  hero,
  order,
];
