const RANKING_NUMBER_OF_ELEMENTS = 5;

const COLORS = {
    USERS: {
        completedBy: 'red',
        checkInBy: 'green',
        checkOutBy: 'red'
    },
    CUSTOMERS: {
        houses: 'green',
        bookings: 'red',
        tasks: 'green',
        cost: 'red'
    },
    HOUSES: {
        tasks: 'red',
        bookings: 'green',
        cost: 'red'
    }
};

const LABELS = {
    USERS: {
        completedBy: 'Tasks Completed',
        checkInBy: 'Check-in Completed',
        checkOutBy: 'Check-out Completed'
    },
    CUSTOMERS: {
        tasks: 'Tasks',
        houses: 'Houses',
        bookings: 'Bookings',
        cost: 'Costs'
    },
    HOUSES: {
        tasks: 'Tasks',
        bookings: 'Bookings',
        cost: 'Costs'
    }
};

export { RANKING_NUMBER_OF_ELEMENTS, COLORS, LABELS };
