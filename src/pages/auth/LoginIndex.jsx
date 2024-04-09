import { Formik, Form} from 'formik';
import { Button } from 'primereact/button';
import { Container, Row, Col } from 'react-bootstrap';
import { CustomInput } from '../../components/formik-inputs/CustomInput';
import { useMutation } from '@tanstack/react-query';
import { authUser } from '../../api/storeApi';
import { loginValidations } from '../../validations/login/loginValidations';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { simpleAlert } from '../../utils/SwalConfig';

export const LoginIndex = () => {
    
    const auth = useAuth();

    if(auth.isAuthenticated){
        return <Navigate  to='/store'/> 
    }


    const userMutation = useMutation({
        mutationFn: authUser,
        onSuccess: (resp) => {
            if(resp.data.success){
                simpleAlert('success', '¡Bienvenido!','Se inició sesión correctamente');
                auth.saveUser(resp.data.user, resp.data.access_token);
                navigate('/store');
            }else{
                simpleAlert('error', '¡Error!', 'Error al iniciar sesión');
            }
            
            
        },
        onError: (error) => {
            simpleAlert('error', '¡Error!', error.response.data.message);
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
        <Container className='text-center' style={{width: '23rem'}}>
        <h1 className='text-white my-3'>Bienvenido</h1>
            <Formik
            initialValues= {{
                email: '',
                password: '',
            }}
            validationSchema={loginValidations}
            onSubmit= {values => handleSubmit(values)}
            >
                { (formik) => (
                    <Form className='text-white'>
                    <div className='field my-4'>
                        <CustomInput 
                            name='email' 
                            autoComplete='off'
                            label='Correo' 
                            placeholder='Ingrese el correo'
                        />
                    </div>
                    <div className='field my-4'>
                        <CustomInput 
                            name='password'
                            autoComplete='off'
                            type='password' 
                            label='Contraseña' 
                            placeholder='Ingrese la contraseña'
                        />
                    </div>

                    <div>
                        <Link to='/register' ><p>Registrarse</p></Link>
                    </div>
                    
                    <div className='field'>
                        <Button type='submit' className='store-btn'>Iniciar sesión</Button>
                    </div>
                </Form>
                )}
            </Formik>
        </Container>
    );
};