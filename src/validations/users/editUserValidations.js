import * as Yup from 'yup';

export const editUserValidations = Yup.object({

    name: Yup.string()
            .required('El nombre es requerido'),

})
