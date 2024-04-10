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
