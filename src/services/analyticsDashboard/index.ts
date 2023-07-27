


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
    static async getNumberOfPediatricians() {
      try {
        const response = await fetch('http://localhost:8000/NumberOfpediatre');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données du nombre de pédiatres par ville :', error);
        throw new Error('Erreur serveur');
      }
    }
    static async getNumberOfpediatreByCity(cityValue:string) {
      try {
        const response = await fetch(`http://localhost:8000/NumberOfpediatreByCity/${cityValue}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données du nombre de pédiatres par ville :', error);
        throw new Error('Erreur serveur');
      }
    }
  
  
  
    static async getAveragePositiveScoreByCity() {
      try {
        const response = await fetch('http://localhost:8000/pediatres/getAveragePositiveScoreByCity');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération :', error);
        throw new Error('Erreur serveur');
      }
    }
    static async getNumberOfPositiveCommentsByCity(cityValue:string) {
      try {
        const response = await fetch(`http://localhost:8000/commentsPositiveCountByCity/${cityValue}`);
      
        const data = await response.json();  
        if (cityValue === '') {
          return;
        } else {
          return data;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du nombre de pédiatres par ville :', error);
        throw new Error('Erreur serveur');
      }
    }
    static async getNumberOfNegativeCommentsByCity(cityValue:string) {
      try {
        const response = await fetch(`http://localhost:8000/commentsNegativeCountByCity/${cityValue}`);
        const data = await response.json();
        if (cityValue === '') {
          return;
        } else {
          return data;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du nombre de pédiatres par ville :', error);
        throw new Error('Erreur serveur');
      }
    }
  }
  export default AnalyticsDashboard