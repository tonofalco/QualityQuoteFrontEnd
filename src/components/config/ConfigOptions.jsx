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
            <div className="row my-4 mx-4">
                {/* COSTOS  */}
                <div className="col-md-2 col-6" onClick={handleButtonClickCosts}>
                    <button
                        type="button"
                        className="btn text-secondary d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ height: '100px', /* Ajusta la altura según tus necesidades */ }}
                    >
                        <i className="fa-solid fa-file-invoice-dollar icon_font mb-1"></i>
                        <span>Costos</span>
                    </button>
                </div>
                {/* USUARIOS */}
                <div className="col-md-2 col-6" onClick={handleButtonClickUsers}>
                    <button
                        type="button"
                        className="btn text-secondary d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ height: '100px', /* Ajusta la altura según tus necesidades */ }}
                    >
                        <i className="fa-solid fa-users icon_font mb-1"></i>
                        <span>Usuarios</span>
                    </button>
                </div>
            </div>
        </>
    );
}
