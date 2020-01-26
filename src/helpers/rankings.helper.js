import {
    RANKING_NUMBER_OF_ELEMENTS,
    BRONZE_AWARD_TARGET,
    GOLD_AWARD_TARGET,
    COLORS,
    LABELS
} from '@/constants/rankings.constants';

function buildTop(mapList, key) {
    return buildUsersRanking(mapList, key).slice(0, RANKING_NUMBER_OF_ELEMENTS);
}

function buildUsersRanking(mapList, key) {
    return mapList.sort((itemA, itemB) => (itemA[key] < itemB[key] ? 1 : -1));
}

function buildUserRanks(users, userId) {
    const usersList = buildUsersList(users);
    const userRanks = {
        tasks: buildUsersRanking(usersList, 'tasks').findIndex(user => user._id === userId) + 1,
        checkIns: buildUsersRanking(usersList, 'checkIns').findIndex(user => user._id === userId) + 1,
        checkOuts: buildUsersRanking(usersList, 'checkOuts').findIndex(user => user._id === userId) + 1
    };

    return userRanks;
}

function getBadgesCounts(counters) {
    return {
        bronze: {
            tasks: Math.floor(counters.tasks / BRONZE_AWARD_TARGET),
            checkIns: Math.floor(counters.checkIns / BRONZE_AWARD_TARGET),
            checkOuts: Math.floor(counters.checkOuts / BRONZE_AWARD_TARGET)
        },
        gold: {
            tasks: Math.floor(counters.tasks / GOLD_AWARD_TARGET),
            checkIns: Math.floor(counters.checkIns / GOLD_AWARD_TARGET),
            checkOuts: Math.floor(counters.checkOuts / GOLD_AWARD_TARGET)
        }
    };
}

function buildUserBadges(user) {
    const badgesCount = getBadgesCounts(user.counters);
    return {
        tasks: {
            bronze: [...Array(badgesCount.bronze.tasks).keys()],
            gold: [...Array(badgesCount.gold.tasks).keys()]
        },
        checkIns: {
            bronze: [...Array(badgesCount.bronze.checkIns).keys()],
            gold: [...Array(badgesCount.gold.checkIns).keys()]
        },
        checkOuts: {
            bronze: [...Array(badgesCount.bronze.checkOuts).keys()],
            gold: [...Array(badgesCount.gold.checkOuts).keys()]
        }
    };
}

function buildUsersList(users) {
    return users.map(user => {
        return {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            tasks: user.counters.tasks,
            checkIns: user.counters.checkIns,
            checkOuts: user.counters.checkOuts
        };
    });
}

function buildUsersTops(users) {
    const usersList = buildUsersList(users);
    return {
        tasks: buildTop(usersList, 'tasks'),
        checkIns: buildTop(usersList, 'checkIns'),
        checkOuts: buildTop(usersList, 'checkOuts')
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

export { buildUsersTops, buildHousesTops, buildCustomersTops, buildRankingViewModel, buildUserRanks, buildUserBadges };
