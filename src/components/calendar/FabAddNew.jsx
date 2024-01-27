import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"



export const FabAddNew = () => {

    const { openDateModal, openViewModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClickNew = () => {
        setActiveEvent({
            transportNumber: '',
            transport: '',
            seats: '',
            nameClient: '',
            phone: '',
            departure: '',
            destination: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            notes: '',
            price: 0,
            advance: 0,
            Usuario: {
                name: ''
            }
        })
        openDateModal()
    }

    return (
        <>
            <button
                className="btn btn-primary fab "
                onClick={handleClickNew}
            >
                <i className="fas fa-plus"></i>
            </button>
        </>
    )
}
