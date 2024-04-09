import { useState } from "react";
import { Formik, Form} from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CustomInput } from '../../formik-inputs/CustomInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany } from "../../../api/storeApi";
import { createCompanyValidations } from "../../../validations/companies/createCompanyValidations";
import { useAuth } from "../../../auth/AuthProvider";
import { simpleAlert } from "../../../utils/SwalConfig";

export const CompanyForm = () => {

    const [visible, setVisible] = useState(false);
    const auth = useAuth();
    const handleDialog = () => setVisible(!visible);

    const formHeader = (
        <div className={'modal-title '}>
            <img src={'/assets/icons/ic-circle-plus.svg'} className={'sm-icon title-icon'}/>
            <h4 style={{margin: '0px'}}>Agregar compañia</h4>
        </div>
    );
    
    const companyMutation = useMutation({
        mutationFn: createCompany,
        onSuccess: (resp) => {
            simpleAlert('success', '¡Compañia agregada!', 'La compañia ha sido agregada correctamente');
            queryClient.invalidateQueries('companies');
        }
    });

    const queryClient = useQueryClient();


    const handleSubmit = (values) => {
        companyMutation.mutate(
            {
                token: auth.authUser.access_token,
                data: values
            }
        );
    };

    return (
        <>
            <div>
                <Button onClick={handleDialog}  className='store-btn mx-2 fw-bold'>
                    <img
                        className={'sm-icon mx-2'}
                        src={'/assets/icons/ic-circle-plus.svg'}
                    />
                    Compañia
                </Button>
            </div>
            <Dialog
                header={formHeader}
                visible={visible}
                style={{width: '33vw'}}
                onHide={handleDialog}
            >
                <Formik
                    initialValues={{
                        nombre: '',
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={createCompanyValidations}
                >
                    {(formik) => (
                        <Form>
                        <div className='field'>
                            <CustomInput 
                                name='nombre' 
                                autoComplete='off'
                                label='Nombre' 
                                placeholder='Ingrese el nombre'
                            />
                        </div>
                        <div className='field text-center'>
                            <Button type='submit' className='store-btn'>Agregar compañia</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    
    );
};