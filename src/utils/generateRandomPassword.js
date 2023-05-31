import crypto from "crypto"

function generateRandomPassword() {
  const length = 8;
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChars = '!@#$%^&*()_+=-{}[]\\|:;\'\"<>,.?/~`';
  const numberChars = '0123456789';

  let password = '';

  // Generate at least one character from each character type
  password += getRandomCharacter(lowercaseChars);
  password += getRandomCharacter(uppercaseChars);
  password += getRandomCharacter(specialChars);
  password += getRandomCharacter(numberChars);

  // Generate remaining characters randomly
  for (let i = 4; i < length; i++) {
    const characters = lowercaseChars + uppercaseChars + specialChars + numberChars;
    password += getRandomCharacter(characters);
  }

  return password;
}

function getRandomCharacter(characters) {
  const randomIndex = crypto.randomInt(0, characters.length);
  return characters[randomIndex];
}

export default generateRandomPassword;