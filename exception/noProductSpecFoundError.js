class NoProductSpecFoundError extends Error {
    constructor(message) {
      super(message);
    }
  }

module.exports = NoProductSpecFoundError