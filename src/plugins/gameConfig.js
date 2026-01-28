export const gameLengthKey = Symbol('gameLength');
export const gameMaxAttemptsKey = Symbol('gameMaxAttempts');

export default {
  install: (app, options = {}) => {
    
    const length = options.length || 4;
    const maxAttempts = options.maxAttempts || 10;

    
    app.provide(gameLengthKey, length);
    app.provide(gameMaxAttemptsKey, maxAttempts);
  }
};
