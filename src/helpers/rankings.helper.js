const RANKING_NUMBER_OF_ELEMENTS = 5;

function buildTop(mapList, prop) {
    return Object.values(mapList)
        .sort((itemA, itemB) => (itemA[prop] < itemB[prop]) ? 1 : -1)
        .slice(0, RANKING_NUMBER_OF_ELEMENTS);
}

function buildRanking(users, list, prop, key) {
    const totalByUser = list.reduce((acc, item) => {
        if (item[key]) {
            const userId = item[key];

            if (acc[userId]) {
                acc[userId][prop]++;
                return acc;
            }
            
            acc[userId] = {
                username: users.find(user => user._id === userId).username,
                [prop]: 1
            };
            return acc;
        }
        return acc;
    }, {});
    
    return buildTop(totalByUser, prop);
}

function buildRankingsForUsers(users, tasks, bookings) {
    return {
        tasks: buildRanking(users, tasks, 'tasks', 'completedBy'),
        checkInBy: buildRanking(users, bookings, 'checkIn', 'checkInBy'),
        checkOutBy: buildRanking(users, bookings, 'checkOut', 'checkOutBy')
    }
}

function buildHousesMap(houses, totalTasks) {
    return houses.reduce((accHouses, house) => {
        accHouses[house._id] = {
            label: house.label,
            tasks: house.tasks.length,
            bookings: house.bookings.length,
            cost: house.tasks.reduce((accTasks, task) => {
                const houseTask = totalTasks.find(taskItem => taskItem._id === task);
                if (houseTask) {
                    return accTasks + houseTask.cost;
                }
                return accTasks;
            }, 0)
        }

        return accHouses;
    }, {});
}

function buildRankingsForHouses(houses, tasks) {
    const housesMap = buildHousesMap(houses, tasks);
    return {
        tasks: buildTop(housesMap, 'tasks'),
        bookings: buildTop(housesMap, 'bookings'),
        cost: buildTop(housesMap, 'cost')
    }
}

function buildHousesInfo(customer, housesMap) {
    return customer.houses.reduce((accHouses, house) => {
        if (housesMap[house]) {
            accHouses.tasks+= housesMap[house].tasks,
            accHouses.bookings+= housesMap[house].bookings,
            accHouses.cost+= housesMap[house].cost
            return accHouses;
        }
        return accHouses;
    }, {
        tasks: 0,
        bookings: 0,
        cost: 0
    });
}

function buildRankingsForCustomers(customers, houses, tasks) {
    const housesMap = buildHousesMap(houses, tasks);
    const customersMap = customers.reduce((accCustomers, customer) => {
        accCustomers[customer._id] = {
            name: `${customer.firstName} ${customer.lastName}`,
            houses: customer.houses.length,
            ...buildHousesInfo(customer, housesMap)
        }
        return accCustomers;
    }, {});

    return {
        houses: buildTop(customersMap, 'houses'),
        bookings: buildTop(customersMap, 'bookings'),
        tasks: buildTop(customersMap, 'tasks'),
        cost: buildTop(customersMap, 'cost')
    }
}

export { buildRankingsForUsers, buildRankingsForHouses, buildRankingsForCustomers };