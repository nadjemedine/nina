import { defineType, defineField } from 'sanity';

// Store Settings Schema
export const storeSettings = defineType({
  name: 'storeSettings',
  title: 'إعدادات المتجر',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'عنوان الموقع',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'وصف الموقع',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'الشعار (اللوجو)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'اللون الأساسي',
      type: 'string',
      description: 'كود اللون الأساسي (مثال: #4A5D23)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'العملة',
      type: 'string',
      initialValue: 'DA',
      options: {
        list: [
          { title: 'دينار جزائري (DA)', value: 'DA' },
          { title: 'دولار أمريكي ($)', value: 'USD' },
          { title: 'يورو (€)', value: 'EUR' },
        ],
      },
    }),
  ],
});

// Product Schema
export const product = defineType({
  name: 'product',
  title: 'المنتجات',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم المنتج',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'وصف المنتج',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'السعر',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'صور المنتج',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'أضف صور متعددة لعرض تفاصيل المنتج.',
    }),
    defineField({
      name: 'sizes',
      title: 'المقاسات والمخزون',
      description: 'إدارة المخزون لكل مقاس محدد.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sizeStock',
          fields: [
            { name: 'size', title: 'المقاس', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'quantity', title: 'الكمية المتوفرة', type: 'number', validation: (Rule) => Rule.required().min(0) },
          ],
          preview: {
            select: {
              title: 'size',
              subtitle: 'quantity',
            },
            prepare({ title, subtitle }) {
              return {
                title: `المقاس: ${title}`,
                subtitle: `${subtitle} متوفر`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'التصنيف',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'متوفر في المخزون؟',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});

// Category Schema
export const category = defineType({
  name: 'category',
  title: 'التصنيفات',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم التصنيف',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'صورة التصنيف',
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
  title: 'الواجهة الرئيسية (Hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان الرئيسي',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'العنوان الفرعي',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'صورة الخلفية',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'نص الزر',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'رابط الزر',
      type: 'string',
    }),
  ],
});

// Order Schema
export const order = defineType({
  name: 'order',
  title: 'الطلبات',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'اسم الزبون',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'رقم هاتف الزبون',
      type: 'string',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'عنوان التوصيل',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productName',
      title: 'المنتج',
      type: 'string',
    }),
    defineField({
      name: 'size',
      title: 'المقاس',
      type: 'string',
    }),
    defineField({
      name: 'quantity',
      title: 'الكمية',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'سعر المنتج',
      type: 'number',
    }),
    defineField({
      name: 'shippingFee',
      title: 'سعر التوصيل',
      type: 'number',
    }),
    defineField({
      name: 'totalAmount',
      title: 'المبلغ الإجمالي',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'حالة الطلب',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'قيد الانتظار', value: 'pending' },
          { title: 'مؤكد', value: 'confirmed' },
          { title: 'تم الشحن', value: 'shipped' },
          { title: 'تم التوصيل', value: 'delivered' },
          { title: 'ملغى', value: 'cancelled' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'تاريخ الإنشاء',
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
