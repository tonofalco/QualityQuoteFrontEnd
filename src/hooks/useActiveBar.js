import { useDispatch, useSelector } from "react-redux"
import { selectLink, onOpenNavBar, onCloseNavBar } from '../store/'

export const useActiveBar = () => {

    const dispatch = useDispatch()

    const valueLink = useSelector((state) => state.navBar.value)
    const stateNavBar = useSelector((state) => state.navBar.isnavBarOpen)

    const openNavBar = () => dispatch( onOpenNavBar() )
    const closeNavBar = () => dispatch( onCloseNavBar() )

    const handleLinkSelection = (value) => {
        dispatch(selectLink(value))
    };




    return { handleLinkSelection, valueLink, openNavBar, closeNavBar, stateNavBar }
}
