import * as Yup from 'yup';

export const loginValidations = Yup.object({
    email: Yup.string()
        .email('El correo debe tener un formato válido')
        .required('El correo es requerido'),

    password: Yup.string()
            .required('La contraseña es requerida'),

})
