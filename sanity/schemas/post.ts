export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R: any) => R.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Lead Generation', value: 'Lead Generation' },
          { title: 'AI Automation', value: 'AI Automation' },
          { title: 'Automation', value: 'Automation' },
          { title: 'CRM & Pipeline', value: 'CRM & Pipeline' },
          { title: 'Setup Guide', value: 'Setup Guide' },
          { title: 'Business Growth', value: 'Business Growth' },
          { title: 'Reputation', value: 'Reputation' },
          { title: 'Authority', value: 'Authority' },
          { title: 'Troubleshooting', value: 'Troubleshooting' },
          { title: 'Funnels & Landing Pages', value: 'Funnels & Landing Pages' },
          { title: 'Industry Guides', value: 'Industry Guides' },
          { title: 'Integrations', value: 'Integrations' },
          { title: 'Platform Review', value: 'Platform Review' },
          { title: 'Lead Recovery', value: 'Lead Recovery' },
        ],
      },
    },
    {
      name: 'readTime',
      title: 'Read Time (e.g. "7 min")',
      type: 'string',
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
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'GHL Service Provider',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            { name: 'type', type: 'string', options: { list: ['tip', 'warning', 'success'] } },
            { name: 'content', type: 'text' },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [{ name: 'code', type: 'text' }],
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
    select: { title: 'title', subtitle: 'category' },
  },
}
