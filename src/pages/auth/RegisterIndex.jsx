import { Formik, Form} from 'formik';
import { Button } from 'primereact/button';
import { Container, Row, Col } from 'react-bootstrap';
import { CustomInput } from '../../components/formik-inputs/CustomInput';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../api/storeApi';
import { registerValidations } from '../../validations/login/registerValidations'; 
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { simpleAlert } from '../../utils/SwalConfig';

export const RegisterIndex = () => {

    const auth = useAuth();

    const navigate = useNavigate();

    if(auth.isAuthenticated){
        return <Navigate  to='/store'/> 
    }
    
    const userMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (resp) => {
            simpleAlert('success', '¡Usuario creado!', 'El usuario ha sido creado correctamente, inicie sesión');
            navigate('/');
        },
        onError: (error) => {
            simpleAlert('error', '¡Error al crear el usuario!', error.response.data.message);
        }
    });


    const handleSubmit = (values) => {
        userMutation.mutate(
            {
                data: values
            }
        );
    };

    return (
        <Container className='text-center' style={{width: '40rem'}} >
        <h1 className='text-white my-3'>Regístrate</h1>
            <Formik
            initialValues= {{
                name: '',
                email: '',
                password: '',
                confirm_password: '',
            }}
            validationSchema={registerValidations}
            onSubmit= {values => handleSubmit(values)}
            >
                { (formik) => (
                    <Form className='text-white'>
                        <div className='field my-4'>
                            <Row>
                                <Col md={6}> 
                                    <CustomInput 
                                        name='name' 
                                        autoComplete='off'
                                        label='Nombre' 
                                        placeholder='Ingrese el nombre de usuario'
                                    />
                                </Col>
                                <Col md={6}> 
                                    <CustomInput 
                                        name='email' 
                                        autoComplete='off'
                                        label='Correo' 
                                        placeholder='Ingrese el correo'
                                    />
                                </Col>
                            </Row>
                        </div>
                    <div className='field my-4'>
                        <Row>
                            <Col md={6}> 
                                <CustomInput 
                                    name='password' 
                                    autoComplete='off'
                                    type='password' 
                                    label='Contraseña' 
                                    placeholder='Ingrese la contraseña'
                                />
                            </Col>
                            <Col md={6}> 
                                <CustomInput 
                                    name='confirm_password' 
                                    autoComplete='off'
                                    type='password' 
                                    label='Confirma tu contraseña' 
                                    placeholder='Ingrese la contraseña'
                                />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Link to='/' ><p>Iniciar Sesión</p></Link>
                    </div>
                    <div className='field'>
                    <Button type='submit' className='store-btn' >Crear cuenta</Button>
                    </div>
                </Form>
                )}
            </Formik>
        </Container>
    );
};