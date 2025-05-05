/**
 * Evaluates password strength based on length, complexity, and common patterns
 * Returns a score from 0-4 and feedback
 */
export const evaluatePasswordStrength = (password: string): { score: number; feedback: string } => {
  // No password
  if (!password) {
    return { score: 0, feedback: 'No password provided' };
  }

  // Start with a base score
  let score = 0;

  // Check length
  if (password.length >= 12) {
    score += 2;
  } else if (password.length >= 8) {
    score += 1;
  }

  // Check for character types
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecials = /[^A-Za-z0-9]/.test(password);

  const charTypeCount = [hasLowercase, hasUppercase, hasNumbers, hasSpecials].filter(Boolean).length;
  score += charTypeCount;

  // Check for common patterns and reduce score
  const hasRepeatedChars = /(.)\1{2,}/.test(password); // Check for repeated characters like 'aaa'
  const hasSequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/i.test(password);
  
  if (hasRepeatedChars) score -= 1;
  if (hasSequential) score -= 1;

  // Cap the score at 0-4
  score = Math.max(0, Math.min(4, score));

  // Generate feedback
  let feedback = '';
  switch (score) {
    case 0:
      feedback = 'Very weak';
      break;
    case 1:
      feedback = 'Weak';
      break;
    case 2:
      feedback = 'Fair';
      break;
    case 3:
      feedback = 'Good';
      break;
    case 4:
      feedback = 'Strong';
      break;
  }

  return { score, feedback };
};

/**
 * Generates a secure random password based on given options
 */
export const generatePassword = (
  length = 12,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true,
  includeSymbols = true
): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = '';
  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (chars.length === 0) {
    chars = lowercase + numbers; // Fallback to ensure we generate something
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};