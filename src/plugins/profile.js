import { ref } from 'vue';

export const pseudo = ref('');
export const pseudoKey = Symbol('pseudo');

export default {
  install: (app) => {
    app.provide(pseudoKey, pseudo);
  }
};
