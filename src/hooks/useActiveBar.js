import { useDispatch, useSelector } from "react-redux"
import { selectLink, onOpenNavBar, onCloseNavBar } from '../store/'

export const useActiveBar = () => {

    const dispatch = useDispatch()

    const valueLink = useSelector((state) => state.navBar.value)
    const stateNavBar = useSelector((state) => state.navBar.isnavBarOpen)


    const handleLinkSelection = (value) => {
        dispatch(selectLink(value))
    };
    
    const openNavBar = () => {
        dispatch(onOpenNavBar())
        // console.log(stateNavBar)
    }

    const closeNavBar = () => {
        dispatch(onCloseNavBar())
        // console.log(stateNavBar)
    }
    


    return {handleLinkSelection, valueLink, openNavBar, closeNavBar, stateNavBar }
}
