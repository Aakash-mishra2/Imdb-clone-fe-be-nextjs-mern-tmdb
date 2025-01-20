export const passwordValidation = (password, minLength) => {
    //criteria pasword sould be 6 char long contains one lowercase, uppercase, number and special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/;
    return (password.length >= minLength && regex.test(password))
}
