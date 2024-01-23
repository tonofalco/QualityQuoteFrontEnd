import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { onEditDayCosts, onEditKms, onLoadCostsStart, onLoadCostsSuccess, onLoadCostsEsSuccess, onLoadCostsFailure, } from "../store"
// import { useAuthStore } from "./useAuthStore"


export const useConfigStore = () => {
    
    const { editDay, editKms } = useSelector(state => state.config)
    const costsValue = useSelector((state) => state.config.costos);
    const costsValueWeekend = useSelector((state) => state.config.costosFinSemana);
    const loading = useSelector((state) => state.config.loading);
    // const {} = updateCosts()

    const dispatch = useDispatch()

    const handleToggleDayEstado = () => dispatch(onEditDayCosts())
    const handleToggleKmsState = () => dispatch(onEditKms())

    const startLoadingCosts = async () => {
        try {
            dispatch(onLoadCostsStart()); // Indicar que se está iniciando la carga de datos
            const { data } = await serverApi.get('/config/costs');
            const config = data.configuracion[0];
            dispatch(onLoadCostsSuccess(config)); // Pasar los datos cargados al estado
        } catch (error) {
            console.log('Error cargando costos:', error);
            dispatch(onLoadCostsFailure()); // Indicar que ha habido un error al cargar los datos
        }
    };

    const startLoadingEsCosts = async () => {
        try {
            dispatch(onLoadCostsStart()); // Indicar que se está iniciando la carga de datos
            const { data } = await serverApi.get('/config/costs');
            const config = data.configuracion[1];
            dispatch(onLoadCostsEsSuccess(config)); // Pasar los datos cargados al estado
        } catch (error) {
            console.log('Error cargando costos:', error);
            dispatch(onLoadCostsFailure()); // Indicar que ha habido un error al cargar los datos
        }
    };

    const handleUpdateCosts = (newCostsData) => {
        return async (dispatch) => {
            try {
                // Realiza la solicitud PUT a tu API para actualizar los costos
                const response = await serverApi.put(`/config/costs/1`, newCostsData);
            } catch (error) {
                console.error('Error al actualizar los costos:', error);
            }
        };
    };

    const handleUpdateEsCosts = (newCostsData) => {
        return async (dispatch) => {
            try {
                // Realiza la solicitud PUT a tu API para actualizar los costos
                const response = await serverApi.put(`/config/costs/2`, newCostsData);
            } catch (error) {
                console.error('Error al actualizar los costos:', error);
            }
        };
    };


    return {
        costsValue,
        costsValueWeekend,

        editDay,
        editKms,

        startLoadingCosts,
        startLoadingEsCosts,
        
        handleUpdateCosts,
        handleUpdateEsCosts,

        handleToggleDayEstado,
        handleToggleKmsState,
    }
}
