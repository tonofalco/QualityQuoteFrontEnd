import { useNavigate } from "react-router-dom";


export const ConfigOptions = () => {
    const navigate = useNavigate();

    const handleButtonClickCosts = () => navigate("/config/costs");
    const handleButtonClickUsers = () => navigate("/config/users");
    const handleButtonClickKms = () => navigate("/config/tablekms");
    // const handleButtonClickClients = () => navigate ("/config/clients")

    return (
        <>
            <h3 className="mt-1">CONFIGURACION</h3>
            <hr />
            <div className="row my-5 mx-1 d-flex align-items-center">
                {/* COSTOS DIA EXTRA */}
                <div className="col-lg-2 col-sm-4 col-6 mb-4 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn text-secondary d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ height: '100px' }}
                        onClick={handleButtonClickCosts}
                    >
                        <i className="fa-solid fa-money-bill-1 icon_font mb-1"></i>
                        <span>Costes <br /> primer dia</span>
                    </button>
                </div>
                {/* COSTOS KMS TABLA */}
                <div className="col-lg-2 col-sm-4 col-6 mb-4 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn text-secondary d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ height: '100px' }}
                        onClick={handleButtonClickKms}
                    >
                        <i className="fa-solid fa-calendar-week icon_font mb-1"></i>
                        <span>Costes <br /> dia extra</span>
                    </button>
                </div>
                {/* Agentes de venta */}
                <div className="col-lg-2 col-sm-4 col-6 mb-4 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn text-secondary d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ height: '100px' }}
                        onClick={handleButtonClickUsers}
                    >
                        <i className="fa-solid fa-user-tie icon_font mb-1"></i>
                        <span>Agentes de venta</span>
                    </button>
                </div>
                {/* Clientes */}
                {/* <div className="col-lg-2 col-sm-4 col-6 mb-4 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn text-secondary d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ height: '100px' }}
                        onClick={handleButtonClickClients}
                    >
                        <i className="fa-solid fa-users icon_font mb-1"></i>
                        <span>Clientes</span>
                    </button>
                </div> */}
            </div>

        </>
    );
}
