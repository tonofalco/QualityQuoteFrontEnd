import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { onEditKms, onLoadCostsSuccess, onLoadCostsEsSuccess, onLoadTotalSumKmsTableEs, onLoadTotalSumKmsTableFs } from "../store"


export const useConfigKmsTableStore = () => {

    const EndpointRouteName = 'firstDayCosts'

    const { editKms, totalKmsEs, totalKmsFs } = useSelector(state => state.configKmsTable)
    const costsValue = useSelector((state) => state.configKmsTable.costos); //array
    const costsValueWeekend = useSelector((state) => state.configKmsTable.costosFinSemana); //array

    const dispatch = useDispatch()

    // CAMBIAR ESTADO DEL MODO EDITABLE
    const handleToggleKmsState = () => dispatch(onEditKms())

    // OBTENER SUMA TOTAL DE KMS ENTRE SEMANA
    const sumaCostoKmsTableEs = () => {

        const { gasoline, salary, booths, maintenance, utility } = costsValue

        try {
            let suma = gasoline + salary + booths + maintenance + utility
            // console.log(suma);

            dispatch(onLoadTotalSumKmsTableEs(suma));
        } catch (error) {
            console.log('Error cargando total Entre semana');
            console.log(error);
        }
    };

    // OBTENER SUMA TOTAL DE KMS FIN DE SEMANA
    const sumaCostoKmsTableFs = () => {

        const { gasoline, salary, booths, maintenance, utility } = costsValueWeekend

        try {
            let suma = gasoline + salary + booths + maintenance + utility
            // console.log(suma);

            dispatch(onLoadTotalSumKmsTableFs(suma));
        } catch (error) {
            console.log('Error cargando total Entre semana');
            console.log(error);
        }
    };

    // OBTENER COSTOS KMS TABLA FIN DE SEMANA
    const startLoadingFsCosts = async () => {
        try {
            const { data } = await serverApi.get(`/cost/${EndpointRouteName}`);
            const costesFs = data.costesKms[1];
            dispatch(onLoadCostsSuccess(costesFs)); // Pasar los datos cargados al estado
        } catch (error) {
            console.log('Error cargando costos:');
            console.log(error);
        }
    };

    // OBTENER COSTOS KMS TABLA ENTRE SEMANA
    const startLoadingEsCosts = async () => {
        try {
            const { data } = await serverApi.get(`/cost/${EndpointRouteName}`);
            const costesEs = data.costesKms[0];
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
                await serverApi.put(`/cost/${EndpointRouteName}/2`, newCostsData);
                startLoadingFsCosts()

            } catch (error) {
                console.error('Error al actualizar los costos:');
                console.log(error);
            }
        };
    };

    //ACTUALIZAR COSTOS ENTRE SEMANA
    const handleUpdateEsCosts = (newCostsData) => {
        return async () => {
            try {
                // Realiza la solicitud PUT a tu API para actualizar los costos
                await serverApi.put(`/cost/${EndpointRouteName}/1`, newCostsData);
                startLoadingEsCosts()
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
        totalKmsEs,
        totalKmsFs,

        //* metodos
        sumaCostoKmsTableEs,
        sumaCostoKmsTableFs,
        handleToggleKmsState,
        handleUpdateFsCosts,
        handleUpdateEsCosts,
        startLoadingFsCosts,
        startLoadingEsCosts,
    }
}
