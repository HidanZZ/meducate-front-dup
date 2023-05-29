import { combineReducers } from '@reduxjs/toolkit'
import entityTreemap from './components/EntityTreemap'
import sentimentTrend from './components/SentimentTrend'
import wordcloud from './components/wordcloud'

export default combineReducers({
  entityTreemap,
  sentimentTrend,
  wordcloud
})
