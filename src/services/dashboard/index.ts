import dashboardApiClient from 'src/axios/dashboardClient'
import {
  Article,
  DateRange,
  DateRangeWithSentiment,
  EntityTreeMap,
  Organization,
  SearchName,
  SentimentTrend,
  SentimentTrendId,
  TopNames
} from 'src/types/apps/dashboard'

class DashboardService {
  static async getTopNames(daterange: DateRange) {
    try {
      const response = await dashboardApiClient.get<Array<TopNames>>(
        `/top-names/from/${daterange.startMonth}/${daterange.startYear}/to/${daterange.endMonth}/${daterange.endYear}`
      )

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async getTopNamesBySentiment(fields: DateRangeWithSentiment) {
    try {
      const response = await dashboardApiClient.get(
        `/top-names-by-sentiment/from/${fields.startMonth}/${fields.startYear}/to/${fields.endMonth}/${fields.endYear}/sentiment/${fields.sentiment}`
      )

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async searchNames(name: string) {
    try {
      const response = await dashboardApiClient.get<Array<SearchName>>(`/search-names/${name}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async getByID(id: string) {
    try {
      console.log('id', id)

      const response = await dashboardApiClient.get<Organization>(`/get-by-id/${id}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getArticlesByID(id: string, page: number) {
    try {
      console.log('id', id)

      const response = await dashboardApiClient.get<Array<Article>>(`/get-articles-by-id/${id}/page/${page}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getEntityTreeMap(id: string) {
    try {
      const response = await dashboardApiClient.get<EntityTreeMap>(`/entity-tree-map/${id}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getSentimentTrendOverTime(daterange: DateRange) {
    try {
      const response = await dashboardApiClient.get<Array<SentimentTrend>>(
        `/sentiment-trend-over-time/from/${daterange.startMonth}/${daterange.startYear}/to/${daterange.endMonth}/${daterange.endYear}`
      )

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async getSentimentTrendById(id: string) {
    try {
      const response = await dashboardApiClient.get<SentimentTrendId>(`/sentiment-data-by-id/${id}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getWordCloudById(id: string, sentiment: string) {
    try {
      const response = await dashboardApiClient.get<string>(`/wordcloud-by-id/${id}/sentiment/${sentiment}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getKeywordAnalysis(fields: DateRangeWithSentiment) {
    try {
      const response = await dashboardApiClient.get(
        `/analyze-keywords/from/${fields.startMonth}/${fields.startYear}/to/${fields.endMonth}/${fields.endYear}/sentiment/${fields.sentiment}`
      )

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async getWordCloud(fields: DateRangeWithSentiment) {
    try {
      const response = await dashboardApiClient.get(
        `/wordcloud/from/${fields.startMonth}/${fields.startYear}/to/${fields.endMonth}/${fields.endYear}/sentiment/${fields.sentiment}`
      )

      return response.data
    } catch (err: any) {
      throw err
    }
  }
}

export default DashboardService
