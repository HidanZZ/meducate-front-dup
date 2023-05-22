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
