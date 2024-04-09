import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditUserForm } from '../user/EditUserForm';

export const Header = ({user}) => {
    

    return (
        <>
            <Row className='header text-white p-3'>
                <Col md={4}>
                    <h1>StoreApp</h1>
                </Col>
                <Col md={8} className='d-flex justify-content-end'>
                    <h4 className='mr-3'>{user.name}</h4>
                    <EditUserForm userData={user}/>
                </Col>
            </Row>
        </>
    );
};