import { Card } from 'primereact/card';
import { Row, Col } from 'react-bootstrap';
import { GameDetails } from './GameDetails';

export const GameCard = ({ name, price, company, stock }) => {
    return (
        <div className=''>
            <Card className='game-card'>
                <Row>
                    <Col md={9}>
                        <h3>{name}</h3>
                    </Col>
                    <Col md={3}>
                        <GameDetails name={name} company={company} price={price} stock={stock} img={'/assets/images/game.png'} />
                    </Col>
                </Row>
                
                { stock > 0 
                    ? 
                        <Row >
                            <Col md={6}>
                                <p className='text-green'>Disponible </p>
                            </Col>
                            <Col md={6}>
                                <p>${price}</p>
                            </Col>
                        </Row>
                    : 
                        <Col md={12}>
                            <p className='text-red'>Agotado</p>
                        </Col>
                }
            </Card>
        </div>
    );
};