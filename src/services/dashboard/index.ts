import dashboardApiClient from 'src/axios/dashboardClient'
import { DateRange, DateRangeWithSentiment } from 'src/types/apps/dashboard'

class DashboardService {
  static async getTopNames(daterange: DateRange) {
    try {
      const response = await dashboardApiClient.get(
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
      const response = await dashboardApiClient.get(`/search-names/${name}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }

  static async getByID(id: string) {
    try {
      const response = await dashboardApiClient.get(`/get-by-id/${id}`)

      return response.data
    } catch (err: any) {
      throw err
    }
  }
  static async getSentimentTrendOverTime(daterange: DateRange) {
    try {
      const response = await dashboardApiClient.get(
        `/sentiment-trend-over-time/from/${daterange.startMonth}/${daterange.startYear}/to/${daterange.endMonth}/${daterange.endYear}`
      )

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
