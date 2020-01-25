import { RANKING_NUMBER_OF_ELEMENTS, COLORS, LABELS } from '@/constants/rankings.constants';

function buildTop(mapList, key) {
    return mapList.sort((itemA, itemB) => (itemA[key] < itemB[key] ? 1 : -1)).slice(0, RANKING_NUMBER_OF_ELEMENTS);
}

function buildRanking(users, list, key) {
    const totalByUser = list.reduce((acc, item) => {
        if (item[key]) {
            const userId = item[key];

            if (acc[userId]) {
                acc[userId][key]++;
                return acc;
            }

            acc[userId] = {
                username: users.find(user => user._id === userId).username,
                [key]: 1
            };
            return acc;
        }
        return acc;
    }, {});

    return buildTop(Object.values(totalByUser), key);
}

function buildUsersTops(users, tasks, bookings) {
    return {
        completedBy: buildRanking(users, tasks, 'completedBy'),
        checkInBy: buildRanking(users, bookings, 'checkInBy'),
        checkOutBy: buildRanking(users, bookings, 'checkOutBy')
    };
}

function buildHousesList(houses, totalTasks) {
    return houses.map(house => {
        return {
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
        };
    });
}

function buildHousesTops(houses, tasks) {
    const housesList = buildHousesList(houses, tasks);
    return {
        tasks: buildTop(housesList, 'tasks'),
        bookings: buildTop(housesList, 'bookings'),
        cost: buildTop(housesList, 'cost')
    };
}

function buildCustomerHousesInfo(customer, housesList) {
    return customer.houses.reduce(
        (accHouses, customerHouse) => {
            const house = housesList.find(houseItem => (houseItem._id = customerHouse));
            if (house) {
                (accHouses.tasks += house.tasks),
                    (accHouses.bookings += house.bookings),
                    (accHouses.cost += house.cost);
                return accHouses;
            }
            return accHouses;
        },
        {
            tasks: 0,
            bookings: 0,
            cost: 0
        }
    );
}

function buildCustomersTops(customers, houses, tasks) {
    const housesList = buildHousesList(houses, tasks);
    const customersList = customers.map(customer => {
        return {
            name: `${customer.firstName} ${customer.lastName}`,
            houses: customer.houses.length,
            ...buildCustomerHousesInfo(customer, housesList)
        };
    });

    return {
        houses: buildTop(customersList, 'houses'),
        bookings: buildTop(customersList, 'bookings'),
        tasks: buildTop(customersList, 'tasks'),
        cost: buildTop(customersList, 'cost')
    };
}

function buildRankingViewModel(tops, topName) {
    return Object.keys(tops).map(rankingKey => {
        return {
            key: rankingKey,
            label: LABELS[topName][rankingKey],
            color: COLORS[topName][rankingKey],
            data: tops[rankingKey]
        };
    });
}

export { buildUsersTops, buildHousesTops, buildCustomersTops, buildRankingViewModel };
