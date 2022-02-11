import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'umami-components',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: `umami-components`,
      directivesProxyFile: `/Users/max/hack/angular-workspace/projects/umami-components/src/lib/stencil-generated/components.ts`
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
