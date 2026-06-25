// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import aws from 'astro-sst';

// If you deploy under a subpath (e.g. a Forgejo Pages project site rather than a
// root domain), also set `site` and `base` here — see the README.
export default defineConfig({
  site: "https://kiro-hero.dev",
  adapter: aws(),
  integrations: [
    starlight({
      title: 'Zero to Kiro Hero',
      description: 'A hands-on workshop for getting productive with the Kiro IDE.',
      customCss: [
        // Self-hosted variable fonts (loaded before the theme so --sl-font can use them).
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/custom.css',
      ],
      components: {
        // Wraps the default page title and renders the workshop progress bar below it.
        PageTitle: './src/components/PageTitle.astro',
      },
      plugins: [
        // Splits the site into "topics" — a flat switcher above the sidebar where
        // each topic carries its own independent sidebar. One topic per workshop:
        // to add another workshop, drop its content under workshops/<name>/ and add
        // a sibling topic object below (label = the workshop's name, link = its first
        // lesson). The progress bar scopes itself to whichever topic is active.
        starlightSidebarTopics([
          {
            label: 'Guides',
            link: '/guides/getting-started/',
            icon: 'open-book',
            items: [{ label: 'Guides', items: ['guides/getting-started'] }],
          },
          {
            label: 'Zero to Kiro Hero',
            link: '/workshops/zero-to-kiro-hero/00-setup/prerequisites/',
            icon: 'rocket',
            // Top-level groups here are the "sections" the progress bar counts within.
            items: [
              {
                label: 'Setup',
                items: [
                  { label: 'Prerequisites', slug: 'workshops/zero-to-kiro-hero/00-setup/prerequisites' },
                  { label: 'Install the IDE', slug: 'workshops/zero-to-kiro-hero/00-setup/install-ide' },
                  { label: 'Install the CLI', slug: 'workshops/zero-to-kiro-hero/00-setup/install-kiro' },
                  { label: 'Authentication', slug: 'workshops/zero-to-kiro-hero/00-setup/authentication' },
                  { label: 'Get the Starter App', slug: 'workshops/zero-to-kiro-hero/00-setup/the-starter-app' },
                ],
              },
              { label: 'Act 0 · First Contact', items: [{ autogenerate: { directory: 'workshops/zero-to-kiro-hero/01-cold-open' } }] },
              { label: 'Act 1 · Context', items: [{ autogenerate: { directory: 'workshops/zero-to-kiro-hero/02-context' } }] },
              { label: 'Act 2 · Control', items: [{ autogenerate: { directory: 'workshops/zero-to-kiro-hero/03-control' } }] },
              { label: 'Act 3 · Brownfield', items: [{ autogenerate: { directory: 'workshops/zero-to-kiro-hero/04-brownfield' } }] },
              // Parked for a future run — kept in the repo at 90-deploy-troubleshoot/, intentionally left out of the active nav.
              { label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'workshops/zero-to-kiro-hero/reference' } }] },
            ],
          },
        ], {
          // Parked: deploy pages stay in the repo but are excluded from the workshop topic (out of nav).
          exclude: ['/workshops/zero-to-kiro-hero/90-deploy-troubleshoot/**'],
        }),
      ],
    }),
  ],
});
