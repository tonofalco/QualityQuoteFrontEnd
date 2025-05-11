
export const CalendarEvent = ({ event }) => {
    const { title, user,transport, destination } = event;

    // (event.user ? console.log(event.user.name) : console.log(Usuario.name));

    // console.log(user.name);

    return (
        <>
            <strong>{transport}</strong> 
            {
                user && user.name 
                ? <span> - {user.name}</span> 
                : <span> - UE</span>
            }
            {/* <span>- {user}</span> */}
            <br />
            <span> {destination}</span>
        </>
    );
};
