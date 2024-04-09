import { Row, Col } from 'react-bootstrap';
import { Header } from '../../components/commons/Header';
import { GameCatalog } from '../../components/store/games/GameCatalog';
import { useAuth } from '../../auth/AuthProvider';


export const StoreApp = () => {

    const user = {
        "id": 1,
        "name": "Mario",
        "email": "mario@gmail.com",
        "email_verified_at": "2024-03-29T19:33:21.000000Z",
        "created_at": "2024-03-29T19:33:22.000000Z",
        "updated_at": "2024-03-29T19:33:22.000000Z"
    }

    const auth = useAuth();

    return (
        <div className='mx-5 my-3'> 
            <Header user={auth.authUser}/>
            <Row>
                <Col md={12}>
                    <GameCatalog />
                </Col>
            </Row>
        </div>
    )
}