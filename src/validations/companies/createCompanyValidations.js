import * as Yup from 'yup';

export const createCompanyValidations = Yup.object({

    nombre: Yup.string()
            .required('El nombre es requerido'),

})
