import { combineReducers } from '@reduxjs/toolkit'
import topNames from './components/topNames'
import topNamesBySentiment from './components/topNamesBySentiment'
import searchNames from './components/searchNames'
import getNameById from './components/getNameById'
import getKeywordAnalysis from './components/getKeywordAnalysis'
import wordcloud from './components/wordcloud'
import getSentimentTrendOverTime from './components/getSentimentTrendOverTime'

export default combineReducers({
  topNames,
  topNamesBySentiment,
  searchNames,
  getNameById,
  getKeywordAnalysis,
  wordcloud,
  getSentimentTrendOverTime
})
