import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { onLoadSpecialCosts, onSelectedSpecialCost, onUpdateSpecialcosts } from "../store"

export const useConfigSpecialCostsStore = () => {

    const EndpointRouteName = 'specialFirstDayRules'

    const dispatch = useDispatch()

    const special_costs = useSelector((state) => state.configSpecialCosts.specialCost);
    const activeCost = useSelector((state) => state.configSpecialCosts.activeCost);

    // OBTENER VALORES DEL COSTO SELECIONADO
    const setActiveCost = (costSelected) => {
        const costActive = special_costs.find(cost => cost.id == costSelected)
        dispatch(onSelectedSpecialCost(costActive))
    }

    // OBTENER COSTOS DIA EXTRA
    const startLoadingSpecialCosts = async () => {
        try {
            const { data } = await serverApi.get(`/cost/${EndpointRouteName}`);
            const costos = data.costesKms;
            // console.log(costos);
            dispatch(onLoadSpecialCosts(costos)); // Pasar 'costos' como argumento
        } catch (error) {
            console.log('Error cargando costos');
            console.log(error);
        }
    };

    //ACTUALIZAR COSTO POR ID
    const updateCostSpecialCost = async (costId, updatedCostInfo) => {
        try {
            const { data } = await serverApi.put(`/cost/${EndpointRouteName}/${costId}`, updatedCostInfo);
            // Suponiendo que la API devuelve la información actualizada del usuario
            dispatch(onUpdateSpecialcosts({ costId, updatedCostInfo: data })); // Actualizar el usuario en el estado
            startLoadingSpecialCosts();
        } catch (error) {
            // console.log(costId, data);
            // console.log(costId, updatedCostInfo );
            console.log(error);
            Swal.fire('Error al actualizar', error.response.data?.msg, 'error');
        }
    };

    return {
        //* propiedades
        special_costs,
        activeCost,

        //* Metodos
        setActiveCost,
        startLoadingSpecialCosts,
        updateCostSpecialCost,
    }



}
