document.addEventListener('DOMContentLoaded', () => {
    const nocToIso = {
        // Mappez les codes NOC des pays avec les codes ISO pour les drapeaux
        "AFG": "af", "ALB": "al", "ALG": "dz", "AND": "ad", "ANG": "ao", "ANT": "ag",
        "ARG": "ar", "ARM": "am", "ARU": "aw", "ASA": "as", "AUS": "au", "AUT": "at",
        "AZE": "az", "BAH": "bs", "BAN": "bd", "BAR": "bb", "BDI": "bi", "BEL": "be",
        "BEN": "bj", "BER": "bm", "BHU": "bt", "BIH": "ba", "BIZ": "bz", "BLR": "by",
        "BOL": "bo", "BOT": "bw", "BRA": "br", "BRN": "bn", "BRU": "bg", "BUL": "bg",
        "BUR": "bf", "CAF": "cf", "CAM": "kh", "CAN": "ca", "CAY": "ky", "CGO": "cg",
        "CHA": "td", "CHI": "cl", "CHN": "cn", "CIV": "ci", "CMR": "cm", "COD": "cd",
        "COK": "ck", "COL": "co", "COM": "km", "CPV": "cv", "CRC": "cr", "CRO": "hr",
        "CUB": "cu", "CYP": "cy", "CZE": "cz", "DEN": "dk", "DJI": "dj", "DMA": "dm",
        "DOM": "do", "ECU": "ec", "EGY": "eg", "ERI": "er", "ESA": "sv", "ESP": "es",
        "EST": "ee", "ETH": "et", "FIJ": "fj", "FIN": "fi", "FRA": "fr", "FSM": "fm",
        "GAB": "ga", "GAM": "gm", "GBR": "gb", "GBS": "gw", "GEO": "ge", "GEQ": "gq",
        "GER": "de", "GHA": "gh", "GRE": "gr", "GRN": "gd", "GUA": "gt", "GUI": "gn",
        "GUM": "gu", "GUY": "gy", "HAI": "ht", "HKG": "hk", "HON": "hn", "HUN": "hu",
        "INA": "id", "IND": "in", "IRI": "ir", "IRL": "ie", "IRQ": "iq", "ISL": "is",
        "ISR": "il", "ISV": "vi", "ITA": "it", "IVB": "vg", "JAM": "jm", "JOR": "jo",
        "JPN": "jp", "KAZ": "kz", "KEN": "ke", "KGZ": "kg", "KIR": "ki", "KOR": "kr",
        "KOS": "xk", "KSA": "sa", "KUW": "kw", "LAO": "la", "LAT": "lv", "LBA": "ly",
        "LBR": "lr", "LCA": "lc", "LES": "ls", "LIB": "lb", "LIE": "li", "LTU": "lt",
        "LUX": "lu", "MAD": "mg", "MAR": "ma", "MAS": "my", "MAW": "mw", "MDA": "md",
        "MDV": "mv", "MEX": "mx", "MGL": "mn", "MHL": "mh", "MKD": "mk", "MLI": "ml",
        "MLT": "mt", "MNE": "me", "MON": "mc", "MOZ": "mz", "MRI": "mu", "MTN": "mr",
        "MYA": "mm", "NAM": "na", "NCA": "ni", "NED": "nl", "NEP": "np", "NGR": "ng",
        "NIG": "ne", "NOR": "no", "NRU": "nr", "NZL": "nz", "OMA": "om", "PAK": "pk",
        "PAN": "pa", "PAR": "py", "PER": "pe", "PHI": "ph", "PLE": "ps", "PLW": "pw",
        "PNG": "pg", "POL": "pl", "POR": "pt", "PRK": "kp", "PUR": "pr", "QAT": "qa",
        "ROU": "ro", "RSA": "za", "RUS": "ru", "RWA": "rw", "SAM": "ws", "SEN": "sn",
        "SEY": "sc", "SGP": "sg", "SIN": "sg", "SKN": "kn", "SLE": "sl", "SLO": "si",
        "SMR": "sm", "SOL": "sb", "SOM": "so", "SRB": "rs", "SRI": "lk", "SSD": "ss",
        "STP": "st", "SUD": "sd", "SUI": "ch", "SUR": "sr", "SVK": "sk", "SWE": "se",
        "SWZ": "sz", "SYR": "sy", "TAN": "tz", "TGA": "to", "THA": "th", "TJK": "tj",
        "TKM": "tm", "TLS": "tl", "TOG": "tg", "TPE": "tw", "TTO": "tt", "TUN": "tn",
        "TUR": "tr", "TUV": "tv", "UAE": "ae", "UGA": "ug", "UKR": "ua", "URU": "uy",
        "USA": "us", "UZB": "uz", "VAN": "vu", "VEN": "ve", "VIE": "vn", "VIN": "vc",
        "YEM": "ye", "ZAM": "zm", "ZIM": "zw"
    };

    fetch('https://sph-i-api.olympics.com/summer-para/info/api/FRA/widgets/medals-table')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('medals-table-body');
            tableBody.innerHTML = ''; // Réinitialise le contenu du tableau avant d'ajouter de nouvelles lignes
            data.medalsTable.slice(0, 100).forEach((country) => {
                const isoCode = nocToIso[country.noc] || country.noc.toLowerCase();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="rank-number">${country.rank}</td>
                    <td><img src="https://flagcdn.com/w40/${isoCode}.png" alt="Drapeau de ${country.description}"></td>
                    <td class="country-name">${country.description}</td>
                    <td class="gold-medals">${country.gold}</td>
                    <td class="silver-medals">${country.silver}</td>
                    <td class="bronze-medals">${country.bronze}</td>
                    <td class="total-medals">${country.total}</td>
                `;
                tableBody.appendChild(row);
            });

            const updateElement = document.getElementById('last-updated');
            const now = new Date();
            const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit' };
            const formattedDate = now.toLocaleDateString('fr-FR', dateOptions);
            const formattedTime = now.toLocaleTimeString('fr-FR', timeOptions);
            updateElement.textContent = `Dernière mise à jour : ${formattedDate} à ${formattedTime}`;
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));

    // Rafraîchissement automatique toutes les 60 secondes
    setInterval(() => {
        window.location.reload();
    }, 60000); // 60000 millisecondes = 60 secondes
});