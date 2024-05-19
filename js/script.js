const app = {
  /**
   * Initialisation de l'app et écouteurs
   */
  init: function () {
    app.landingPage();
    app.selectsHandler();
    app.listHandler();

    // Les écouteurs ----------------------------------
    document
      .getElementById("langSelect")
      .addEventListener("change", app.listHandler);
    document
      .getElementById("speSelect")
      .addEventListener("change", app.listHandler);
  },

  /**
   * Création de l'architecture de la page d'accueil
   */
  landingPage: function () {
    const app = document.getElementById("app");
    const form = document.createElement("form");

    // Sélecteur language -----------------------------
    const langSelect = document.createElement("select");
    langSelect.id = "langSelect";

    app.appendChild(form).appendChild(langSelect);

    const option = document.createElement("option");
    option.setAttribute("disable", "");
    option.setAttribute("selected", "");
    option.setAttribute("value", "");

    option.textContent = "Choisissez un Langage";
    langSelect.appendChild(option);

    // Sélecteur spécialité --------------------------
    const speSelect = document.createElement("select");
    speSelect.id = "speSelect";

    app.appendChild(form).appendChild(speSelect);

    const speOption = document.createElement("option");
    speOption.setAttribute("disable", "");
    speOption.setAttribute("selected", "");
    speOption.setAttribute("value", "");

    speOption.textContent = "Choisissez une Spé";
    speSelect.appendChild(speOption);
  },

  /**
   * Ajoute des options à un sélecteur HTML.
   * @param {Set<string>} items - Ensemble des éléments à ajouter comme options.
   * @param {string} selectId - ID du sélecteur HTML.
   */
  populateSelect: function (items, selectId) {
    const select = document.getElementById(selectId);
    items.forEach((item) => {
      const option = document.createElement("option");
      option.id = item;
      option.setAttribute("value", item);
      option.textContent = item;
      select.appendChild(option);
    });
  },

  /**
   * Gère la population des sélecteurs de langages et de spécialités avec des valeurs uniques.
   */
  selectsHandler: function () {
    // Construction du tableau des langages sans doublon
    const languages = new Set(this.trainers.map((trainer) => trainer.language));
    app.populateSelect(languages, "langSelect");

    // Construction du tableau des spécialités sans doublon
    const specialties = new Set(
      this.trainers.map((trainer) => trainer.specialty)
    );
    app.populateSelect(specialties, "speSelect");
  },

  /**
   * La fonction utilisée par les écouteurs des sélecteurs
   */
  listHandler: function () {
    // Liste des profs selon les modalités du sélecteur language et spécialité
    const form = document.querySelector("form");
    const ul = document.createElement("ul");
    ul.id = "listProf";
    form.appendChild(ul);

    // Un encart pour le compteur de résultat
    const count = document.createElement("p");
    count.id = "counter";
    form.appendChild(count);
    ul.before(count);

    // Je stock une copie des données, je vais m'en servir pour stocker temporairement le résustat d'un filtre
    let filteredTrainers = [...app.trainers];

    const selectedLanguage = langSelect.value;
    const selectedSpecialty = speSelect.value;

    if (selectedLanguage) {
      filteredTrainers = filteredTrainers.filter(
        (trainer) => trainer.language === selectedLanguage
      );
    }
    if (selectedSpecialty) {
      filteredTrainers = filteredTrainers.filter(
        (trainer) => trainer.specialty === selectedSpecialty
      );
    }
    // Je transmet ce tableau ------------------------
    app.displayResult(filteredTrainers);
  },

  /**
   * Affiche le résultat des sélecteurs
   * @param {Array} filteredTrainers
   */
  displayResult: function (filteredTrainers) {
    // Le compteur de résultat -----------------------
    let counter = filteredTrainers.length;
    const count = document.getElementById("counter");
    count.textContent = `${counter} résultats trouvés`;

    // Initialisation à 0 de la liste des formateurs
    const ul = document.getElementById("listProf");
    ul.textContent = "";

    if (filteredTrainers.length === 0) {
      ul.textContent = "Aucun formateur trouvé";
    } else {
      filteredTrainers.forEach((trainer) => {
        counter++;
        const li = document.createElement("li");
        li.textContent = `${trainer.name} - ${trainer.language} (${trainer.specialty})`;
        ul.appendChild(li);
      });
    }
  },

  // Ces données pourraient être à l'intérieur d'un dossier data, dans un fichier .json.
  trainers: [
    {
      name: "Benjamin B.",
      language: "PHP",
      specialty: "Symfony",
    },
    {
      name: "Benjamin N.",
      language: "JavaScript",
      specialty: "Data",
    },
    {
      name: "Benoit",
      language: "JavaScript",
      specialty: "Data",
    },
    {
      name: "Cécile",
      language: "PHP",
      specialty: "React",
    },
    {
      name: "Fabien",
      language: "JavaScript",
      specialty: "React",
    },
    {
      name: "Jean-Baptiste",
      language: "PHP",
      specialty: "Symfony",
    },
    {
      name: "Jean-Christophe",
      language: "PHP",
      specialty: "Symfony",
    },
    {
      name: "Luko",
      language: "JavaScript",
      specialty: "React",
    },
    {
      name: "Quentin",
      language: "JavaScript",
      specialty: "React",
    },
    {
      name: "Solène",
      language: "PHP",
      specialty: "React",
    },
    {
      name: "Yann",
      language: "JavaScript",
      specialty: "Data",
    },
  ],
};

document.addEventListener("DOMContentLoaded", app.init);
