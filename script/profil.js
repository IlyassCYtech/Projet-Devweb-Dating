// Données du profil
// Cacher le formulaire de modification au chargement de la page
profileFormSection.style.display = 'none';

// Afficher le formulaire de modification
editButton.addEventListener('click', () => {
    profileDisplay.style.display = 'none';
    profileFormSection.style.display = 'block';
    // Remplir le formulaire avec les données actuelles du profil
    document.getElementById('pseudonyme').value = userProfile.pseudonyme;
    document.getElementById('sexe').value = userProfile.sexe;
    document.getElementById('dateNaissance').value = userProfile.dateNaissance;
    document.getElementById('profession').value = userProfile.profession;
    document.getElementById('residence').value = userProfile.residence;
    document.getElementById('situation').value = userProfile.situation;
    document.getElementById('description').value = userProfile.description;
});

let userProfile = {
    image: '',
    pseudonyme: 'MonPseudo',
    sexe: 'Femme',
    dateNaissance: '2000-01-01',
    profession: 'Développeur',
    residence: 'France',
    situation: 'Célibataire',
    description: 'Je suis une personne sympa'
};

// Sélection des éléments
const profileDisplay = document.getElementById('profile-display');
const profileFormSection = document.getElementById('profile-form-section');
const editButton = document.getElementById('edit-button');
const cancelButton = document.getElementById('cancel-button'); // Ajouté un bouton Annuler
const profileForm = document.getElementById('profile-form');
const deleteImageButton = document.getElementById('delete-image-button');

// Fonction pour afficher les données du profil
function displayProfile() {
    profileDisplay.innerHTML = `
        <img src="${userProfile.image}" alt="Image de profil">
        <p>Pseudonyme : ${userProfile.pseudonyme}</p>
        <p>Sexe : ${userProfile.sexe}</p>
        <p>Date de naissance : ${userProfile.dateNaissance}</p>
        <p>Profession : ${userProfile.profession}</p>
        <p>Résidence : ${userProfile.residence}</p>
        <p>Situation : ${userProfile.situation}</p>
        <p>Description : ${userProfile.description}</p>
    `;
}

// Cacher le formulaire de modification au chargement de la page
profileFormSection.style.display = 'none';

// Afficher le formulaire de modification
editButton.addEventListener('click', () => {
    profileDisplay.style.display = 'none';
    profileFormSection.style.display = 'block';
    // Remplir le formulaire avec les données actuelles du profil
    document.getElementById('pseudonyme').value = userProfile.pseudonyme;
    document.getElementById('sexe').value = userProfile.sexe;
    document.getElementById('dateNaissance').value = userProfile.dateNaissance;
    document.getElementById('profession').value = userProfile.profession;
    document.getElementById('residence').value = userProfile.residence;
    document.getElementById('situation').value = userProfile.situation;
    document.getElementById('description').value = userProfile.description;
});

// Annuler la modification
cancelButton.addEventListener('click', () => {
    profileDisplay.style.display = 'block';
    profileFormSection.style.display = 'none';
});

// Supprimer l'image de profil
deleteImageButton.addEventListener('click', () => {
    userProfile.image = '';
    displayProfile();
});

// Enregistrer les modifications du profil
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Mettre à jour les données du profil avec les valeurs du formulaire
    userProfile.image = URL.createObjectURL(document.getElementById('profile-image').files[0]);
    userProfile.pseudonyme = document.getElementById('pseudonyme').value;
    userProfile.sexe = document.getElementById('sexe').value;
    userProfile.dateNaissance = document.getElementById('dateNaissance').value;
    userProfile.profession = document.getElementById('profession').value;
    userProfile.residence = document.getElementById('residence').value;
    userProfile.situation = document.getElementById('situation').value;
    userProfile.description = document.getElementById('description').value;

    displayProfile();

    // Afficher à nouveau le profil et masquer le formulaire
    profileDisplay.style.display = 'block';
    profileFormSection.style.display = 'none';
});

// Afficher les données initiales du profil
displayProfile();
