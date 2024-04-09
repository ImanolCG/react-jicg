import * as Yup from 'yup';

export const registerValidations = Yup.object({

    name: Yup.string()
            .required('El nombre es requerido'),

    email: Yup.string()
        .email('El correo debe tener un formato válido')
        .required('El correo es requerido'),

    password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('La contraseña es requerida'),

    confirm_password: Yup.string()
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .required('La contraseña es requerida')
                .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),

})
