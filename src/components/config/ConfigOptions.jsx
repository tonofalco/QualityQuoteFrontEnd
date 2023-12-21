import { useNavigate } from "react-router-dom";


export const ConfigOptions = () => {
    const navigate = useNavigate();

    const handleButtonClickCosts = () => {
        navigate("/config/costs");
    };

    const handleButtonClickUsers = () => {
        navigate("/config/users");
    };

    return (
        <>
        <h1 className="mt-2">CONFIGURACION</h1>
        <hr />
            <div className="row">
                <div className="col-md-2 col-6 my-3 d-flex flex-column text-center option" onClick={handleButtonClickCosts}>
                    <span><i className="fa-solid fa-file-invoice-dollar icon_font"></i></span>
                    <button type="button" className="btn text-secondary">Costos</button>
                </div>
                <div className="col-md-2 col-6 my-3 d-flex flex-column text-center option" onClick={handleButtonClickUsers}>
                    <span><i className="fa-solid fa-users icon_font"></i></span>
                    <button type="button" className="btn text-secondary">Usuarios</button>
                </div>
            </div>
        </>
    );
}
