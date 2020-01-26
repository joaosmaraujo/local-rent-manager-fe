const RANKING_NUMBER_OF_ELEMENTS = 5;
const BRONZE_AWARD_TARGET = 30;
const GOLD_AWARD_TARGET = 100;

const COLORS = {
    USERS: {
        tasks: 'red',
        checkIns: 'green',
        checkOuts: 'red'
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
        tasks: 'Tasks Completed',
        checkIns: 'Check-in Completed',
        checkOuts: 'Check-out Completed'
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

export { RANKING_NUMBER_OF_ELEMENTS, BRONZE_AWARD_TARGET, GOLD_AWARD_TARGET, COLORS, LABELS };
