export const finalLogin = (login) => {
    return {
        type: 'SET_LOGIN',
        payload: login
    }
}

export const editingProject = (project) => {
    return {
        type: 'SET_PROJECT',
        payload: project
    }
}

export const editTicket = (ticket) => {
    console.log(ticket);
    return{
        type: 'EDIT_TICKET',
        payload: ticket
    }
}

export const projectTickets = (project) => {
    return{
        type: 'PROJECT_TICKETS',
        payload: project
    }
}