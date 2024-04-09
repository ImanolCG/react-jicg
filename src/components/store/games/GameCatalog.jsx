import { useContext,  useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {Dropdown} from 'primereact/dropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchQuery } from "../../../hooks/useQueries";
import { GameForm } from './GameForm';
import { useAuth } from '../../../auth/AuthProvider';
import { CompanyForm } from '../companies/CompanyForm';
import { GameCard } from './GameCard';


import { simpleAlert } from "../../../utils/SwalConfig";


export const GameCatalog = () => {

    const auth = useAuth();
    const [companyId, setCompanyId] = useState(0);
    const queryClient = useQueryClient();

    const companies = useFetchQuery(
        '/api/companies/all',
        auth.authUser.access_token,
        'getCompanies'
    );

    const games = useFetchQuery(
        '/api/games/all',
        auth.authUser.access_token,
        'getGames'
    );

    const companyGames = useFetchQuery(
        '/api/company-games',
        auth.authUser.access_token,
        'getCompanyGames'
    );

    const handleCompanyFilter = (companyId) => {
        console.log('onChange', companyId);
    }

    if( games.isFetching || companyGames.isFetching ) return <h4 className='text-white'>Cargando Juegos...</h4>

    if( games.isError ) return <h4 className='text-white'>Error: {games.error.message}</h4>

    const gameList = companyGames.data.data?.map((game) => {
        return  <Col md={3} key={game.id} >
                    <GameCard 
                        name={getNameById(games.data.data, game.game_id)} 
                        company={getNameById(companies.data.data, game.company_id)} 
                        price={game.price} 
                        stock={game.stock}
                    />
                </Col>
    });

    function getNameById(array, id) {
        const item = array.find(item => item.id === id);
        return item ? item.nombre : '';
    }

    const testAlert = () => {
        simpleAlert('success', '¡Juego agregado!', 'El juego ha sido agregado correctamente');
    }

    return (
        <div className='mx-5 my-3'> 
            <Row className='text-white'>
                {!companies.isFetching && 
                        <Col md={12} className='d-flex justify-content-end'>
                            <button onClick={testAlert}>alert</button>
                            {/* <Dropdown
                                onChange={(e) => handleCompanyFilter(e.target.value)}
                                options={companies.data.data}
                                optionLabel='nombre'
                                optionValue='id'
                            /> */}
                            <GameForm companies={companies.data.data}/>
                            <CompanyForm />
                        </Col>
                }
                <Row className='mt-4'>
                    {gameList}
                </Row>
                
            </Row>

        </div>
    )
}