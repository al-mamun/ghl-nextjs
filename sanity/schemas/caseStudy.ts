export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          'Local Services', 'Cleaning Business', 'Gym & Fitness',
          'Real Estate', 'Contractor', 'Coaching', 'Agency', 'Other',
        ],
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (R: any) => R.required().max(300),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'results',
      title: 'Key Results (shown on listing page)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value (e.g. "2x")', type: 'string' },
          { name: 'label', title: 'Label (e.g. "Close Rate")', type: 'string' },
          { name: 'sub', title: 'Sub text (e.g. "12% → 28%")', type: 'string' },
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
      validation: (R: any) => R.max(4),
    },
    {
      name: 'gradientStart',
      title: 'Card Gradient (CSS gradient string)',
      type: 'string',
      description: 'e.g. linear-gradient(135deg,#1a1033,#2d1b69,#6366f1)',
      initialValue: 'linear-gradient(135deg,#1a1033,#2d1b69,#6366f1)',
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'resultsTable',
          title: 'Results Table',
          fields: [{
            name: 'rows',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'metric', type: 'string' },
                { name: 'before', type: 'string' },
                { name: 'after', type: 'string' },
              ],
            }],
          }],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            { name: 'type', type: 'string', options: { list: ['tip', 'warning', 'success'] } },
            { name: 'content', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'industry' },
  },
}
