exports.generateUserErrorInfo = (user) => {
    return `Una o mas propiedades están incompletas, no es válido.
    lista de propiedades requeridas: 
    first_name: necesita ser string, y se recibió ${user.first_name}
    last_name : necesita ser string, y se recibió ${user.last_name}
    email     : necesita ser string, y se recibió ${user.email}`
}