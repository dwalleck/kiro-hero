/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "kiro-hero",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Astro("MyWeb", {
      domain: {
        name: "kiro-hero.dev",
        dns: false,
      },
    });
  },
});
