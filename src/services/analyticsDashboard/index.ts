


class AnalyticsDashboard {

static async getPediatriciansCountByCity() {
    try {
      const response = await fetch('http://localhost:8000/pediatres/countByCity');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du nombre de pédiatres par ville :', error);
      throw new Error('Erreur serveur');
    }
  }

}
export default AnalyticsDashboard