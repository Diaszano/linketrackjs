import { UserConfig } from 'vite';

const config: UserConfig = {
  resolve: {
    alias: {
      '@': '../src',
    },
  },
};

export default config;
