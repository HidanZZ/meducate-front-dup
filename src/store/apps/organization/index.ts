import { combineReducers } from '@reduxjs/toolkit'
import entityTreemap from './components/EntityTreemap'
import sentimentTrend from './components/SentimentTrend'
import wordcloud from './components/wordcloud'
import ArticlesById from './components/ArticlesById'

export default combineReducers({
  entityTreemap,
  sentimentTrend,
  wordcloud,
  ArticlesById
})
