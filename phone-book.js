'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
const isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = new Map();

/**
 * Приводит по конкретному индексу контакта в строку
 * @param {String?} phone
 * @returns {String}
 */
function toString(phone) {
    const p1 = phone.slice(0, 3);
    const p2 = phone.slice(3, 6);
    const p3 = phone.slice(6, 8);
    const p4 = phone.slice(8, 10);
    const p = `+7 (${p1}) ${p2}-${p3}-${p4}`;

    return phoneBook[phone][0] + ', ' + p +
    (phoneBook[phone][1] !== undefined ? ', ' + phoneBook[phone][1] : '');
}

function isContainsContact(phone) {
    if (phoneBook.length === 0) {
        return false;
    }

    return Object.keys(phoneBook).includes(phone);
}


/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function add(phone, name, email) {
    if (!isCorrect(phone, name)) {
        return false;
    }
    if (!isContainsContact(phone)) {
        var temp = [];
        temp[0] = name;
        temp[1] = email;
        phoneBook[phone] = temp;

        return true;
    }

    return false;
}

function isCorrect(phone, name) {
    if (phone.length !== 10 || !/^\d{10}$/.test(phone) ||
    typeof(name) !== 'string' || name === '') {
        return false;
    }

    return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (name === undefined || name === '') {
        return false;
    }
    if (isContainsContact(phone)) {
        var temp = [];
        temp[0] = name;
        temp[1] = email;
        phoneBook[phone] = temp;

        return true;
    }

    return false;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
function findAndRemove(query) {
    var result = findKeys(query);
    for (var item of result) {
        delete phoneBook[item];
    }

    return result.length;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
function find(query) {
    const result = findKeys(query);

    return result.sort((a, b) =>
        phoneBook[a][0].localeCompare(phoneBook[b][0])
    )
        .map(toString);
}

function findKeys(query) {
    if (query === '*') {
        return Object.keys(phoneBook);
    }
    if (query === '' || query === undefined) {
        return [];
    }

    return Object.keys(phoneBook)
        .filter(phone =>
            phone.includes(query) ||
            phoneBook[phone][0].includes(query) ||
            (phoneBook[phone][1] !== undefined && phoneBook[phone][1].includes(query)));
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
function importFromCsv(csv) {
    if (typeof(csv) !== 'string' || csv === '') {
        return 0;
    }
    var tempContact = csv.split('\n');
    var count = 0;
    for (var i = 0; i < tempContact.length; i++) {
        var tmp = tempContact[i].split(';');
        var name = tmp[0];
        var phone = tmp[1];
        var email = tmp[2];
        if (add(phone, name, email) || update(phone, name, email)) {
            count++;
        }
    }

    return count;
}

module.exports = {
    add,
    update,
    findAndRemove,
    find,
    importFromCsv,
    isStar
};
