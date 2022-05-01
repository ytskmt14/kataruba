import Vue from 'vue';

import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

Amplify.configure(awsExports)
applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.use(Amplify)
