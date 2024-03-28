import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { onLoadCostsExtraDay } from "../store"


export const useConfigExtraDayStore = () => {

    const dispatch = useDispatch()

    const startLoadingCostsExtraDay = async () => {
        try {
            const { data } = await serverApi.get('/extraDayCosts/costs');
            // console.log(data);
            const costos = data.costos;
            dispatch(onLoadCostsExtraDay(costos)); // Pasar 'costos' como argumento
        } catch (error) {
            console.log('Error cargando costos');
            console.log(error);
        }
    };

    return {
        //* propiedades


        //* Metodos
        startLoadingCostsExtraDay
    }

}
