import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { onLoadCostsExtraDay, onLoadTotalSumExtraDayEs, onLoadTotalSumExtraDayFs, onSelectedCost, onDeleteCostExtraDay, onUpdateCostExtraDay } from "../store"


export const useConfigExtraDayStore = () => {

    const dispatch = useDispatch()

    const costs_extraDay = useSelector((state) => state.configExtraDay.costsExtraDay);
    const activeCost = useSelector((state) => state.configExtraDay.activeCost);
    const {totalEs, totalFs} = useSelector((state) => state.configExtraDay);
    // const totalFs = useSelector((state) => state.configExtraDay.totalFs);

    // OBTENER VALORES DEL COSTO SELECIONADO
    const setActiveCost = (costSelected) => {
        const costActive = costs_extraDay.find(cost => cost.id == costSelected)
        dispatch(onSelectedCost(costActive))
    }

    // OBTENER SUMA TOTAL DE COSTO EN DIA ENTRE SEMANA
    const sumaCostoDiaExtraEs = () => {
        try {
            let suma = 0
            costs_extraDay.forEach(cost => {
                suma += cost.valueEs
            });

            // console.log(suma);
            dispatch(onLoadTotalSumExtraDayEs(suma));



        } catch (error) {
            console.log('Error cargando total Entre semana');
            console.log(error);
        }
    };

    // OBTENER SUMA TOTAL DE COSTO EN DIA FIN SEMANA
    const sumaCostoDiaExtraFs = () => {
        try {
            let suma = 0
            costs_extraDay.forEach(cost => {
                suma += cost.valueFs;
            });

            // console.log(suma);
            dispatch(onLoadTotalSumExtraDayFs(suma));
        } catch (error) {
            console.log('Error cargando total fin de semana');
            console.log(error);
        }
    };

    // OBTENER COSTOS DIA EXTRA
    const startLoadingCostsExtraDay = async () => {
        try {
            const { data } = await serverApi.get('/cost/extraDay');
            // console.log(data.costosDiaExtra);
            const costos = data.costosDiaExtra;
            dispatch(onLoadCostsExtraDay(costos)); // Pasar 'costos' como argumento
        } catch (error) {
            console.log('Error cargando costos');
            console.log(error);
        }
    };

    // RREGISTRAR UN NUEVO COSTO
    const startRegisterCost = async ({ cost, valueEs, valueFs }) => {

        try {
            const { data } = await serverApi.post('/cost/extraDay/new', { cost, valueEs, valueFs })
            // console.log(data);
            startLoadingCostsExtraDay()
            // const costos = data.costosDiaExtra;
            // dispatch(onLoadCostsExtraDay(costos)); // Pasar 'costos' como argumento

        } catch (error) {
            console.log('Error creando nuevo costo');
            console.log(error);
        }

    }

    //ELIMINAR COSTO POR ID
    const deleteCostExtraDay = async (costId) => {
        try {
            const { data } = await serverApi.delete(`/cost/extraDay/${costId}`)
            dispatch(onDeleteCostExtraDay(costId));
            startLoadingCostsExtraDay();
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    };

    //ACTUALIZAR COSTO POR ID
    const updateCostExtraDay = async (costId, updatedCostInfo) => {
        try {
            const { data } = await serverApi.put(`/cost/extraDay/${costId}`, updatedCostInfo);
            // Suponiendo que la API devuelve la información actualizada del usuario
            dispatch(onUpdateCostExtraDay({ costId, updatedCostInfo: data })); // Actualizar el usuario en el estado
            startLoadingCostsExtraDay();
        } catch (error) {
            // console.log(costId, data);
            // console.log(costId, updatedCostInfo );
            console.log(error);
            Swal.fire('Error al actualizar', error.response.data?.msg, 'error');
        }
    };

    return {
        //* propiedades
        costs_extraDay,
        activeCost,
        totalEs,
        totalFs,

        //* Metodos
        setActiveCost,
        sumaCostoDiaExtraEs,
        sumaCostoDiaExtraFs,
        startLoadingCostsExtraDay,
        startRegisterCost,
        deleteCostExtraDay,
        updateCostExtraDay,
    }

}
