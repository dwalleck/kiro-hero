// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// If you deploy under a subpath (e.g. a Forgejo Pages project site rather than a
// root domain), also set `site` and `base` here — see the README.
export default defineConfig({
  integrations: [
    starlight({
      title: 'Zero to Kiro Hero',
      description: 'A hands-on workshop for getting productive with the Kiro IDE.',
      customCss: ['./src/styles/custom.css'],
      components: {
        // Wraps the default page title and renders the workshop progress bar below it.
        PageTitle: './src/components/PageTitle.astro',
      },
      sidebar: [
        {
          label: 'Setup',
          items: [
            { label: 'Prerequisites', slug: '00-setup/prerequisites' },
            { label: 'Install Kiro', slug: '00-setup/install-kiro' },
            { label: 'Verify your setup', slug: '00-setup/verify' },
          ],
        },
        { label: 'First Steps', items: [{ autogenerate: { directory: '01-first-steps' } }] },
        { label: 'Spec-Driven Development', items: [{ autogenerate: { directory: '02-spec-driven' } }] },
        { label: 'Build a Real Feature', items: [{ autogenerate: { directory: '03-build-it' } }] },
        { label: 'Going Further', items: [{ autogenerate: { directory: '04-going-further' } }] },
        { label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'reference' } }] },
      ],
    }),
  ],
});
