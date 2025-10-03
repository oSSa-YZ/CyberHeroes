const crypto = require('crypto');

function hashPasswordWithSalt(password, salt) {
  return crypto.createHash("sha256").update(salt + ":" + password).digest("hex");
}

const salt = "default-salt-for-teacher";
const password = "teacher123";
const hash = hashPasswordWithSalt(password, salt);

console.log("=== Teacher Password Hash Generator ===");
console.log("Password:", password);
console.log("Salt:", salt);
console.log("Generated Hash:", hash);
console.log("Expected Hash:", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3");
console.log("Match:", hash === "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3");
