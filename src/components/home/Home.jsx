import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { General } from './General';
import { CalendarList } from './CalendarList';
import { useAuthStore } from '../../hooks';
import { useEffect, useState } from 'react';


export const Home = () => {

    const { startLoadingUsers, errorMessage } = useAuthStore();
    
    const [isLoading, setIsLoading] = useState(false);
    


    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error');
        } else if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await startLoadingUsers();
            };
    
            fetchData();
        }
    }, [isLoading, startLoadingUsers]);


    return (
        <>
            <div className='container'>
                <h3 className="mt-1">DASHBOARD</h3>
                
                <hr />

                {/* distibucion de Pestañas */}
                <Tabs
                    defaultActiveKey="General"
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="General" title="General">
                        <General />
                    </Tab>
                    <Tab eventKey="Proximos destinos" title="Proximos destinos">
                        <CalendarList />
                    </Tab>
                </Tabs>

            </div>
        </>
    )
}
