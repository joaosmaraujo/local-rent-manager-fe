import {
    RANKING_NUMBER_OF_ELEMENTS,
    BRONZE_AWARD_TARGET,
    GOLD_AWARD_TARGET,
    COLORS,
    LABELS
} from '@/constants/rankings.constants';

/**
 * This function builds a top with a limited number of elements
 * of all elements of a given list sorted by a given key
 * @namespace rankingsHelper.buildTop
 * @param {array} mapList - list of objects which the top will be built from
 * @param {string} key - key to be used to sort the elements of the list
 * @returns {array} array with limited number of elements sorted by the key
 */
function buildTop(mapList, key) {
    return buildUsersRanking(mapList, key).slice(0, RANKING_NUMBER_OF_ELEMENTS);
}

/**
 * This function sorts a given list by a given key
 * @namespace rankingsHelper.buildUsersRanking
 * @param {array} mapList - list of objects
 * @param {string} key - key to be used to sort the elements of the list
 * @returns {array} array with all elements sorted by the given key
 */
function buildUsersRanking(mapList, key) {
    return mapList.sort((itemA, itemB) => (itemA[key] < itemB[key] ? 1 : -1));
}

/**
 * This function builds an object with the position of a user in terms of
 * tasks completed, check-in completed and check-out completed
 * @namespace rankingsHelper.buildUsersRanks
 * @param {array} users - array of users
 * @param {string} userId - user id
 * @returns {object} object containing the position of the user
 * for tasks, check-in and check-out completed
 */
function buildUserRanks(users, userId) {
    const usersList = buildUsersList(users);
    const userRanks = {
        tasks: buildUsersRanking(usersList, 'tasks').findIndex(user => user._id === userId) + 1,
        checkIns: buildUsersRanking(usersList, 'checkIns').findIndex(user => user._id === userId) + 1,
        checkOuts: buildUsersRanking(usersList, 'checkOuts').findIndex(user => user._id === userId) + 1
    };

    return userRanks;
}

/**
 * This function builds an object with the number of bronze and gold
 * badges based on the number of tasks completed, check-in completed
 * and check-out completed
 * @namespace rankingsHelper.getBadgesCounts
 * @param {object} counters
 * @param {object|number} counters.tasks number of tasks completed
 * @param {object|number} counters.checkIns number of check-in completed
 * @param {object|number} counters.checkOuts number of check-out completed
 * @returns {object} object containing the number of bronze and gold badges
 */
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

/**
 * This function builds an object with arrays with as much positions
 * as the number of bronze and gold badges for tasks completed,
 * check-in completed and check-out completed by an user
 * @namespace rankingsHelper.buildUserBadges
 * @param {object} user - object containing information about the user including
 * his counters of tasks, check-in and check-out completed
 * @returns {object} object containing arrays with as much positions as
 * the badges earned by the user
 */
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

/**
 * This function builds a new array of users with its info adapted
 * @namespace rankingsHelper.buildUsersList
 * @param {array} users - array of users
 * @returns {array} containing users
 */
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

/**
 * This function builds the tops of users in terms of
 * tasks completed, check-in completed and check-out completed
 * @namespace rankingsHelper.buildUsersTops
 * @param {array} users - array of users
 * @param {string} userId - user id
 * @returns {object} object containing the tops of users
 * in terms of tasks, check-in and check-out completed
 */
function buildUsersTops(users) {
    const usersList = buildUsersList(users);
    return {
        tasks: buildTop(usersList, 'tasks'),
        checkIns: buildTop(usersList, 'checkIns'),
        checkOuts: buildTop(usersList, 'checkOuts')
    };
}

/**
 * This function builds a new array of houses with information about their
 * labels, number of tasks, number of bookings and accumulated cost
 * @namespace rankingsHelper.buildHousesList
 * @param {array} houses - array of all houses
 * @param {array} totalTasks - array of all tasks
 * @returns {array} array of houses containing information about each one
 * label, number of tasks, number of bookings and accumulated cost
 */
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

/**
 * This function builds the tops of houses in terms of
 * tasks, bookings and cost
 * @namespace rankingsHelper.buildHousesTops
 * @param {array} houses - array of houses
 * @param {string} tasks - array of tasks
 * @returns {object} object containing the tops of houses in terms of
 * tasks, bookings and cost
 */
function buildHousesTops(houses, tasks) {
    const housesList = buildHousesList(houses, tasks);
    return {
        tasks: buildTop(housesList, 'tasks'),
        bookings: buildTop(housesList, 'bookings'),
        cost: buildTop(housesList, 'cost')
    };
}

/**
 * This function builds an object with the number of tasks, number of bookings and
 * accumulated cost of the houses of the same customer
 * @namespace rankingsHelper.buildCustomerHousesInfo
 * @param {object} customer - object containing information about customer
 * @param {array} housesList - array of houses
 * @returns {object} object containing the number of tasks, number of bookings and
 * accumulated cost of the houses of the same customer
 */
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

/**
 * This function builds the tops of customers in terms of
 * houses, tasks, bookings and cost
 * @namespace rankingsHelper.buildCustomersTops
 * @param {array} customers - array of customers
 * @param {array} houses - array of houses
 * @param {array} tasks - array of tasks
 * @returns {object} object containing the tops of customers 
 * in terms of houses, tasks, bookings and cost
 */
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

/**
 * This function builds a ranking view model
 * containing information to render each top of the ranking 
 * @namespace rankingsHelper.buildRankingViewModel
 * @param {object} tops - object containing the tops
 * @param {string} rankingName - the name of the ranking
 * @returns {object} object containing the view model
 * containing information to render each top of the ranking
 */
function buildRankingViewModel(tops, rankingName) {
    return Object.keys(tops).map(rankingKey => {
        return {
            key: rankingKey,
            label: LABELS[rankingName][rankingKey],
            color: COLORS[rankingName][rankingKey],
            data: tops[rankingKey]
        };
    });
}

export { buildUsersTops, buildHousesTops, buildCustomersTops, buildRankingViewModel, buildUserRanks, buildUserBadges };
