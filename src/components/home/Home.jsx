import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { General } from './General';
import { CalendarList } from './CalendarList';

import { useAuthStore } from "../../hooks"


export const Home = () => {

    const { user } = useAuthStore()

    return (
        <>
            <div className='content'>
                <h3>DASHBOARD</h3>
                <p><i>Bienvenido {user.name}</i></p>
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
