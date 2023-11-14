import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onEditDayCosts, onEditKms, onLoadCosts } from "../store"

export const useConfigStore = () => {
    const { editDay, editKms } = useSelector(state => state.config)
    const costsValue = useSelector((state) => state.config.costos)
    // const {} = updateCosts()

    const dispatch = useDispatch()

    const handleToggleDayEstado = () => dispatch(onEditDayCosts())
    const handleToggleKmsState = () => dispatch(onEditKms())

    const startLoadingCosts = async () => {
        try {
            const { data } = await calendarApi.get('/config/costs');
            const config = data.configuracion[0];
            // console.log(config);
            dispatch(onLoadCosts(config)); // Pasar 'usuarios' como argumento
        } catch (error) {
            console.log('Error cargando usuarios');
            console.log(error);
        }
    };

    const handleUpdateCosts = (newCostsData) => {
        return async (dispatch) => {
            try {
                // Realiza la solicitud PUT a tu API para actualizar los costos
                const response = await calendarApi.put(`/config/costs/1`, newCostsData);
                
            } catch (error) {
                console.error('Error al actualizar los costos:', error);
            }
        };
    };


    return {
        costsValue,

        editDay,
        editKms,

        startLoadingCosts,
        handleUpdateCosts,

        handleToggleDayEstado,
        handleToggleKmsState,
    }
}
