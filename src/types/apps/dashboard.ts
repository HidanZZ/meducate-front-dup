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
