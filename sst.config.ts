/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "kiro-hero",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        cloudflare: "5.37.1",
      },
    };
  },
  async run() {
    new sst.aws.Astro("MyWeb", {
      domain: {
        name: "kiro-hero.dev",
        dns: sst.cloudflare.dns(),
      },
    });
  },
});
