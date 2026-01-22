import { ref } from 'vue';

export const pseudo = ref('');
export const pseudoKey = Symbol('pseudo');

export default {
  install: (app) => {
    // Rend le pseudo accessible dans l'application via inject(pseudoKey)
    app.provide(pseudoKey, pseudo);
  }
};
