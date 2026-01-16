import HashService from "./hash.service.js";
import CryptoStrategy from "./strategies/crypto.strategy.js";

const cryptoStrategy = new CryptoStrategy();
const hashService = new HashService(cryptoStrategy);

// Manual test
const password = "admin123";

// Hash the password
const { salt, hash } = hashService.hash(password);
console.log(`Salt: ${salt}`);
console.log(`Hash: ${hash}`);

// Verify the password
const isPasswordValid = hashService.verifyPassword("palavra passe aleatoria", hash);
console.log(`Is password valid? ${isPasswordValid}`);