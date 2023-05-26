export type DateRange = {
  startMonth: number
  startYear: number
  endMonth: number
  endYear: number
}

export type DateRangeWithSentiment = DateRange & {
  sentiment: Sentiment
}

export type Sentiment = 'pos' | 'neg'

export type TopNames = {
  _id: string
  name: string
  count: number
}

export const allTimeDateRange: DateRange = {
  startMonth: 1,
  startYear: 1900,
  endMonth: 12,
  endYear: 2100
}
export const lastYearDateRange: DateRange = {
  startMonth: 1,
  startYear: new Date().getFullYear() - 1,
  endMonth: 12,
  endYear: new Date().getFullYear() - 1
}

export type SentimentTrend = {
  date: {
    $date: string
  }
  sentiments: Array<{
    sentiment: string
    count: number
  }>
}

export type SearchName = {
  name: string
  _id: string
  negativeCount: number
  positiveCount: number
  paragraphCount: number
}
