import * as Yup from 'yup';

export const gameValidations = Yup.object({

        nombre: Yup.string()
                .required('El nombre es requerido'),
        price: Yup.string()
                .required('El precio es requerido'),
        company_id: Yup.number()
                .required('La compañia es requerida'),
        stock: Yup.string()
                .required('La cantidad de unidades en stock es requerida'),

})
