
export const CalendarEvent = ({ event }) => {
    const { title, Usuario,transport, destination } = event;

    // (event.user ? console.log(event.user.name) : console.log(Usuario.name));

    return (
        <>
            <strong>{transport}</strong>
            {
                event.user 
                ?  <span> - {event.user.name}</span> 
                : <span> - {Usuario.name}</span>
            }
            <br />
            <span> {destination}</span>
        </>
    );
};
