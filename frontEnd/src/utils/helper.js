export const emailValidator = (email) => {
    // Standard regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Use .test() to check the string
    return emailRegex.test(email);
}