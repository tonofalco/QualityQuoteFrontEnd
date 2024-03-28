import { BigCalendar, NavBar, OverlayWhole, SideBar } from "../components"
import { useActiveBar } from "../hooks"



export const CalendarPage = () => {

    const { stateNavBar } = useActiveBar()

    return (
        <>
            <div className="row gx-0">
                <div className="sidebar_column d-none d-md-block">
                    <SideBar />
                </div>

                <div className="content_column">
                    <NavBar />

                    {!stateNavBar
                        ? (
                            <div className="row">
                                <div className="col-12">
                                    <BigCalendar />
                                </div>
                            </div>
                        ) : (
                            <div className="overlay">
                                <OverlayWhole />
                            </div>
                        )}

                </div>

            </div>
        </>
    )
}