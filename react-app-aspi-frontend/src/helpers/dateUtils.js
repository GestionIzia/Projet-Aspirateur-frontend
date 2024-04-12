export const compareDates = (date1, date2) => {
    const today = new Date();

    if (date1 === "Indisponible" || date1 === "???") {
        return 1; // date1 est plus ancienne que date2
    }

    if (date2 === "Indisponible" || date2 === "???") {
        return -1; // date2 est plus ancienne que date1
    }

    if (date1 === "aujourd'hui") {
        return -1; // date1 est plus récente que date2
    }

    if (date2 === "aujourd'hui") {
        return 1; // date2 est plus récente que date1
    }

    if (date1 === "hier") {
        if (date2 === "aujourd'hui") {
            return -1; // date1 est plus récente que date2
        }
        return 1; // date1 est plus ancienne que date2
    }

    if (date2 === "hier") {
        if (date1 === "aujourd'hui") {
            return 1; // date2 est plus récente que date1
        }
        return -1; // date2 est plus ancienne que date1
    }

    // Continuer avec la logique de comparaison basée sur les timestamps
    // ...
};

export const getDateTimestamp = (date) => {
    const today = new Date();

    const lowerCaseDate = date.toLowerCase();

    if (lowerCaseDate === "???" || lowerCaseDate === "non spécifié") {
        // Marquer la date comme très ancienne
        return Number.MIN_SAFE_INTEGER;
    } else if (lowerCaseDate === "aujourd'hui") {
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
