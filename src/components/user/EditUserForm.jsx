import { useState } from "react";
import { Formik, Form} from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { CustomInput } from '../formik-inputs/CustomInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUser } from "../../api/storeApi";
import { editUserValidations } from '../../validations/users/editUserValidations';
import { useAuth } from "../../auth/AuthProvider";
import { simpleAlert } from "../../utils/SwalConfig";

export const EditUserForm = ({userData}) => {

    const [visible, setVisible] = useState(false);
    const handleDialog = () => setVisible(!visible);
    const auth = useAuth();

    const formHeader = (
        <div className={'modal-title '}>
            <img src={'/assets/icons/ic-edit-user.svg'} className={'sm-icon title-icon'}/>
            <h4 style={{margin: '0px'}}>Editar nombre de usuario</h4>
        </div>
    );
    
    const userMutation = useMutation({
        mutationFn: editUser,
        onSuccess: (resp) => {
            if(resp.success){
                simpleAlert('success', '¡Nombre de usuario modificado!', 'El nombre de usuario ha sido modificado correctamente');
                auth.saveUser(resp.user, auth.authUser.access_token);
            }else{
                simpleAlert('error', '¡Error!', 'Error al editar el nombre de usuario');
            }
            setVisible(!visible);
            
        }
    });

    const queryClient = useQueryClient();

    

    const handleSubmit = (values) => {
        userMutation.mutate(
            {
                token: auth.authUser.access_token,
                params: {id: userData.id},
                data: values
            }
        );
    };

    return (
        <>
            <div>
                <img
                    className={'sm-icon pointer-icon'}
                    src={'/assets/icons/ic-edit-user.svg'}
                    onClick={handleDialog}
                />
            </div>
            <Dialog
                header={formHeader}
                visible={visible}
                style={{width: '33vw'}}
                onHide={handleDialog}
            >
                <Formik
                    initialValues={{name: userData.name}}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={editUserValidations}
                >
                    {(formik) => (
                        <Form>
                            <div className='field'>
                                <CustomInput 
                                name='name' 
                                autoComplete='off'
                                label='Nombre' 
                                placeholder='Ingrese el nuevo nombre de usuario'
                                />
                            </div>
                            
                            <div className='field text-center'>
                                <Button type='submit' className='store-btn'>Guardar</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    
    );
};