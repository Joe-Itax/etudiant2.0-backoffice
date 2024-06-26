import axios from "axios";

const checkAuthStatus = async (setCurrentUser, setIsAuthenticated) => {
  try {
    const auth = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/status`,
      {
        withCredentials: true, // Activer l'envoi des cookies avec la requête
      }
    );

    // setIsAuthenticated(auth.data.authenticated);
    // setAuthentication(auth);
    console.log("auth reussi: ", auth);
    setCurrentUser(auth.data.user);
    setIsAuthenticated(auth.data.isAuthenticated);
  } catch (error) {
    console.log(
      "erreur lors de la recupération du status de connection: ",
      error
    );
  }
};

const formatTimestamp = (timestamp) => {
  // Extraction de la date et de l'heure
  const dateString = timestamp.substring(0, 24); // Ajustement pour inclure le fuseau horaire
  const date = new Date(dateString);

  // Formatage de la date
  // const formattedDate = date.toLocaleDateString();

  // Formatage de l'heure
  // const formattedTime = date.toLocaleTimeString();

  // Calcul de la différence de temps
  const currentDate = new Date();
  const timeDiffInMs = currentDate - date;
  const seconds = Math.floor(timeDiffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Nombre approximatif de mois
  const years = Math.floor(months / 12); // Nombre approximatif d'années

  // Détermination de l'affichage relatif
  let relativeTime;
  if (seconds < 60) {
    relativeTime = "il y a quelques secondes";
  } else if (minutes < 60) {
    relativeTime = `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (hours < 24) {
    relativeTime = `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else if (days < 30) {
    relativeTime = `il y a ${days} jour${days > 1 ? "s" : ""}`;
  } else if (months < 12) {
    relativeTime = `il y a ${months} mois`;
  } else {
    relativeTime = `il y a ${years} an${years > 1 ? "s" : ""}`;
  }

  // Retour du timestamp formaté avec l'heure relative
  return `${relativeTime}`;
};

/*
function formatFileSize(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  // Diviser par 1024 jusqu'à trouver la bonne unité
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // Formater pour obtenir 2 décimales
  const formattedSize = size.toFixed(2) + " " + units[unitIndex];
  return formattedSize;
}
*/

export { formatTimestamp, checkAuthStatus };
