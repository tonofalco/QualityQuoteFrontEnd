import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { General } from './General';
import { CalendarList } from './CalendarList';


export const Home = () => {


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
