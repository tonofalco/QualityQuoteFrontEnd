import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal, onOpenViewModal, onCloseViewModal } from '../store/';


export const useUiStore = () => {

    const dispatch = useDispatch()

    const { isDateModalOpen, isModalViewOpen, customStyles } = useSelector(state => state.ui)


    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal()
    }

    const openViewModal = () => {
        dispatch(onOpenViewModal())
    }

    const closeViewModal = () => {
        dispatch(onCloseViewModal())
    }

    const toggleViewModal = () => {
        (isModalViewOpen)
            ? openDateModal()
            : closeDateModal()
    }

    return {
        //* propiedades
        isDateModalOpen,
        isModalViewOpen,
        customStyles,
        
        //* metodos
        openDateModal,
        openViewModal,
        closeDateModal,
        closeViewModal,
        toggleDateModal,
        toggleViewModal,
    }

}