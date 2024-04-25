/*export const compareDates = (date1, date2) => {
    const today = new Date();

    if (isUnavailable(date1)) {
        return 1; // date1 est plus ancienne que date2
    }

    if (isUnavailable(date2)) {
        return -1; // date2 est plus ancienne que date1
    }

    if (isToday(getDateTimestamp(date1))) {
        return -1; // date1 est plus récente que date2
    }

    if (isToday(getDateTimestamp(date2))) {
        return 1; // date2 est plus récente que date1
    }

    if (isYesterday(getDateTimestamp(date1))) {
        if (isToday(getDateTimestamp(date2))) {
            return -1; // date1 est plus récente que date2
        }
        return 1; // date1 est plus ancienne que date2
    }

    if (isYesterday(getDateTimestamp(date2))) {
        if (isToday(getDateTimestamp(date1))) {
            return 1; // date2 est plus récente que date1
        }
        return -1; // date2 est plus ancienne que date1
    }

    if (isDayBeforeYesterday(getDateTimestamp(date1))) {
        if (isToday(getDateTimestamp(date2))) {
            return -1; // date1 est plus récente que date2
        }
        return 1; // date1 est plus ancienne que date2
    }

    if (isDayBeforeYesterday(getDateTimestamp(date2))) {
        if (isToday(getDateTimestamp(date1))) {
            return 1; // date2 est plus récente que date1
        }
        return -1; // date2 est plus ancienne que date1
    }

    if (isWithinOneWeek(getDateTimestamp(date1))) {
        if (isWithinOneWeek(getDateTimestamp(date2))) {
            return 0; // dates dans la même semaine
        }
        return -1; // date1 est plus récente que date2
    }

    if (isWithinOneWeek(getDateTimestamp(date2))) {
        return 1; // date2 est plus récente que date1
    }

    if (isWithinOneYear(getDateTimestamp(date1))) {
        if (isWithinOneYear(getDateTimestamp(date2))) {
            return 0; // dates dans la même année
        }
        return -1; // date1 est plus récente que date2
    }

    if (isWithinOneYear(getDateTimestamp(date2))) {
        return 1; // date2 est plus récente que date1
    }

    // Comparaison des dates spécifiques si les deux dates ne sont pas dans la même année
    // ...

    // Si aucune des conditions ci-dessus n'est satisfaite, comparer les timestamps
    const timestamp1 = getDateTimestamp(date1);
    const timestamp2 = getDateTimestamp(date2);

    return timestamp2 - timestamp1;
};

export const getDateTimestamp = (date) => {
    const today = new Date();

    const lowerCaseDate = date.toLowerCase();

    if (lowerCaseDate === "???" || lowerCaseDate === "indisponible" || lowerCaseDate === "non spécifié") {
        // Marquer la date comme très ancienne
        return Number.MIN_SAFE_INTEGER;
    } else if (lowerCaseDate === "aujourd'hui") {
        return -1; // Marque la date comme "aujourd'hui"
    } else if (lowerCaseDate === "hier") {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return yesterday.getTime();
    } else if (lowerCaseDate === "avant-hier") {
        const dayBeforeYesterday = new Date(today);
        dayBeforeYesterday.setDate(today.getDate() - 2);
        return dayBeforeYesterday.getTime();
    } else if (lowerCaseDate.includes("il y a") && lowerCaseDate.includes("jours")) {
        // Gérer le cas "il y a X jours"
        const daysAgo = parseInt(lowerCaseDate.split(" ")[2]);
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - daysAgo);
        return targetDate.getTime();
    } else if (lowerCaseDate.includes("il y a") && lowerCaseDate.includes("heure")) {
        // Gérer le cas "il y a X heures"
        const hoursAgo = parseInt(lowerCaseDate.split(" ")[2]);
        const targetHours = new Date(today);
        targetHours.setHours(today.getHours() - hoursAgo);
        return targetHours.getTime();
    } else if (isSpecificDate(date)) {
        const [day, month, year] = date.split("/");
        const specificDate = new Date(`${year}-${month}-${day}`);
        return specificDate.getTime();
    } else {
        return new Date(date).getTime();
    }
};

export const isToday = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp);
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

export const isYesterday = (timestamp) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const date = new Date(timestamp);
    return date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();
};

export const isDayBeforeYesterday = (timestamp) => {
    const dayBeforeYesterday = new Date();
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
    const date = new Date(timestamp);
    return date.getDate() === dayBeforeYesterday.getDate() &&
        date.getMonth() === dayBeforeYesterday.getMonth() &&
        date.getFullYear() === dayBeforeYesterday.getFullYear();
};

export const isWithinOneWeek = (timestamp) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const date = new Date(timestamp);
    return date >= oneWeekAgo;
};

export const isWithinOneYear = (timestamp) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const date = new Date(timestamp);
    return date >= oneYearAgo;
};

export const isSpecificDate = (date) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    return datePattern.test(date);
};

export const isUnavailable = (date) => {
    return date === "???" || date.toLowerCase() === "Indisponible" || date.toLowerCase() === "non spécifié";
};
*/

export const compareDates = (date1, date2) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

    const date1Timestamp = getDateTimestamp(date1, today, yesterday, dayBeforeYesterday);
    const date2Timestamp = getDateTimestamp(date2, today, yesterday, dayBeforeYesterday);

    if (date1Timestamp < date2Timestamp) {
        return 1; // date1 est plus récente que date2
    } else if (date1Timestamp > date2Timestamp) {
        return -1; // date1 est plus ancienne que date2
    } else {
        return 0; // Les dates sont égales
    }

};

export const getDateTimestamp = (date, today, yesterday, dayBeforeYesterday) => {
        const lowerCaseDate = date.toLowerCase();
        if (lowerCaseDate === "aujourd'hui") {
            return -1; // Marque la date comme "aujourd'hui"
        } else if (lowerCaseDate === "hier") {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday.getTime();
        } else if (lowerCaseDate === "avant-hier") {
            const dayBeforeYesterday = new Date(today);
            dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
            return dayBeforeYesterday.getTime();
        } else if (lowerCaseDate.includes("il y a") && lowerCaseDate.includes("jours")) {
            // Gérer le cas "il y a X jours"
            const daysAgo = parseInt(lowerCaseDate.split(" ")[2]);
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() - daysAgo);
            return targetDate.getTime();
        } else if (lowerCaseDate.includes("il y a") && lowerCaseDate.includes("heure")) {
            // Gérer le cas "il y a X heures"
            const hoursAgo = parseInt(lowerCaseDate.split(" ")[2]);
            const targetHours = new Date(today);
            targetHours.setHours(today.getHours() - hoursAgo);
            return targetHours.getTime();
        } else {
            return new Date(date).getTime();
        }
    };


export const sortCardsByDate = (cards) => {
    // Créer un objet où les clés sont les dates et les valeurs sont des tableaux d'offres
    const dateGroups = {};
    cards.forEach(card => {
        if (!dateGroups[card.Date]) {
            dateGroups[card.Date] = [];
        }
        dateGroups[card.Date].push(card);
    });

    // Trier chaque tableau d'offres individuellement en fonction de la date
    Object.keys(dateGroups).forEach(date => {
        dateGroups[date].sort((a, b) => compareDates(a.Date, b.Date));
    });

    // Concaténer tous les tableaux triés pour obtenir la liste finale triée
    const sortedOffers = Object.values(dateGroups).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

    return sortedOffers;
};