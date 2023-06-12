export function generationAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Неверно введен пароль";
        case "EMAIL_NOT_FOUND":
            return "Неверно введена почта";
        case "EMAIL_EXISTS":
            return "Пользователь с такой почтой уже существует";
        default:
            return "Слишком много попыток входа. Попоробуйте позже!";
    }
}
