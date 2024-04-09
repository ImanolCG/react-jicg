import { useState } from "react";
import { Formik, Form} from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CustomInput } from '../../formik-inputs/CustomInput';
import { CustomSelect } from '../../formik-inputs/CustomSelect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGame } from "../../../api/storeApi";
import { gameValidations } from "../../../validations/games/gameValidations";
import { useAuth } from "../../../auth/AuthProvider";
import { simpleAlert } from "../../../utils/SwalConfig";

export const GameForm = ({companies}) => {

    const [visible, setVisible] = useState(false);
    const auth = useAuth();
    const handleDialog = () => setVisible(!visible);
    const queryClient = useQueryClient();

    const formHeader = (
        <div className={'modal-title '}>
            <img src={'/assets/icons/ic-circle-plus.svg'} className={'sm-icon title-icon'}/>
            <h4 style={{margin: '0px'}}>Agregar juego</h4>
        </div>
    );
    
    const gameMutation = useMutation({
        mutationFn: createGame,
        onSuccess: (resp) => {
            simpleAlert('success', '¡Juego agregado!', 'El juego ha sido agregado correctamente');
            queryClient.invalidateQueries('games');
        }
    });


    const handleSubmit = (values) => {
        gameMutation.mutate(
            {
                token: auth.authUser.access_token,
                data: values
            }
        );
    };

    return (
        <>
            <div>
                <Button onClick={handleDialog} className='store-btn mx-2 fw-bold'>
                    <img
                        className={'sm-icon mx-2'}
                        src={'/assets/icons/ic-circle-plus.svg'}
                    />
                    Juego
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
                        price: '',
                        company_id: '',
                        stock: '',
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={gameValidations}
                >
                    {(formik) => (
                        <Form>
                        <div className='field my-2'>
                            <CustomInput 
                                name='nombre' 
                                autoComplete='off'
                                label='Nombre' 
                                placeholder='Ingrese el nombre'
                            />
                        </div>
                        <div className='field my-2'>
                            <CustomInput 
                                name='price' 
                                autoComplete='off'
                                label='Precio' 
                                placeholder='Ingrese el precio'
                            />
                        </div>
                        <div className='fild my-2'>
                            <CustomInput 
                                name='stock' 
                                autoComplete='off'
                                label='Unidades en stock' 
                                placeholder='Ingrese la cantidad'
                            />
                        </div>
                        <div className='field my-2'>
                            <CustomSelect 
                                name='company_id' 
                                optionValue='id'
                                optionLabel='nombre'
                                label='Compañia' 
                                options={companies}
                            />
                        </div>
                        <div className='field my-3 text-center'>
                            <Button type='submit' className='store-btn'>Agregar Juego</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    
    );
};