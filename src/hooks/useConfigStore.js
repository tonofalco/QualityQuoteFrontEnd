import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { onEditKms, onLoadCostsSuccess, onLoadCostsEsSuccess } from "../store"


export const useConfigStore = () => {

    const { editKms } = useSelector(state => state.configKmsTable)
    const costsValue = useSelector((state) => state.configKmsTable.costos); //array
    const costsValueWeekend = useSelector((state) => state.configKmsTable.costosFinSemana); //array

    const dispatch = useDispatch()

    // CAMBIAR ESTADO DEL MODO EDITABLE
    const handleToggleKmsState = () => dispatch(onEditKms())

    // OBTENER COSTOS KMS TABLA FIN DE SEMANA
    const startLoadingFsCosts = async () => {
        try {
            const { data } = await serverApi.get('/cost/kmsTable');
            const costesFs = data.costesKms[0];
            dispatch(onLoadCostsSuccess(costesFs)); // Pasar los datos cargados al estado
        } catch (error) {
            console.log('Error cargando costos:');
            console.log(error);
        }
    };

    // OBTENER COSTOS KMS TABLA ENTRE SEMANA
    const startLoadingEsCosts = async () => {
        try {
            const { data } = await serverApi.get('/cost/kmsTable');
            const costesEs = data.costesKms[1];
            dispatch(onLoadCostsEsSuccess(costesEs)); // Pasar los datos cargados al estado
        } catch (error) {
            console.log('Error cargando costos:');
            console.log(error);
        }
    };

    //ACTUALIZAR COSTOS FIN DE SEMANA
    const handleUpdateFsCosts = (newCostsData) => {
        return async () => {
            try {
                await serverApi.put(`/cost/kmsTable/1`, newCostsData);
            } catch (error) {
                console.error('Error al actualizar los costos:');
                console.log(error);
            }
        };
    };

    //ACTUALIZAR COSTOS ENTRE SEMANA
    const handleUpdateEsCosts = (newCostsData) => {
        return async (dispatch) => {
            try {
                // Realiza la solicitud PUT a tu API para actualizar los costos
                const response = await serverApi.put(`/cost/kmsTable/2`, newCostsData);
            } catch (error) {
                console.error('Error al actualizar los costos:', error);
            }
        };
    };


    return {
        //* propiedades
        costsValue,
        costsValueWeekend,
        editKms,

        //* metodos
        handleToggleKmsState,
        handleUpdateFsCosts,
        handleUpdateEsCosts,
        startLoadingFsCosts,
        startLoadingEsCosts,
    }
}
