import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Row, Col } from 'react-bootstrap';

export const GameDetails = ({name, company, price, stock, img}) => {

    const [visible, setVisible] = useState(false);
    const handleDialog = () => setVisible(!visible);

    const formHeader = (
        <div className={'modal-title '}>
            <img src={'/assets/icons/ic-gaming.svg'} className={'sm-icon title-icon'}/>
            <h4 style={{margin: '0px'}}>Detalles del juego</h4>
        </div>
    );
    
    

    return (
        <>
            <div>
                <img 
                    onClick={handleDialog}
                    className={'sm-icon pointer-icon'}
                    src={'/assets/icons/ic-search.svg'}
                />
            </div>
            <Dialog
                className='bg-app'
                header={formHeader}
                visible={visible}
                style={{width: '33vw'}}
                onHide={handleDialog}
            >
            
                <Row className="my-4">
                    <Col md={4}>
                        <img src={img} className="game-img" />
                    </Col>
                    <Col md={8}>
                        <h3>{name}</h3>
                        <h5>{company}</h5>
                    </Col>
                </Row>

                <Row>
                    {stock > 0 
                        ? 
                        <Row >
                            <Col md={6}>
                                <h6>Disponibles: </h6> 
                                <h5>{stock} {stock == 1 ? 'Unidad' : 'Unidades'}</h5> 
                            </Col>
                            <Col md={6}>
                                <h6>Precio:</h6>
                                <h5>${price}</h5>
                            </Col>
                        </Row>
                            
                        : 
                            <Col md={12}>
                                <h5 className='text-red'>Agotado</h5>
                            </Col>
                    }
                    
                </Row>

            </Dialog>
        </>
    
    );
};