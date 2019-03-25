import i18n from 'i18n'
import dateFormat from 'dateformat'

export function setSEOSettings(page) {
  if (page && i18n[page]) {
    const seoSettings = i18n[page]
    document.title = seoSettings.seoTitle
    if (seoSettings.seoDescription) {
      document.querySelector('meta[name="description"]').setAttribute('content', seoSettings.seoDescription)
    }
    if (seoSettings.seoKeywords) {
      document.querySelector('meta[name="keywords"]').setAttribute('content', seoSettings.seoKeywords)
    }
    return true
  } else {
    return false
  }
}
export function formatDate(date, format) {
  return dateFormat(date, format)
}
export function getQueryParams() {
  var queryParams = window.location.search.substr(1).split('&').reduce((q, query) => {
    var chunks = query.split('=')
    var key = chunks[0]
    var value = chunks[1]
    if (key.indexOf('[]') >= 0) {
      if (!q[key]) {
        q[key] = []
      }
      q[key].push(value)
      return (q[key], q)
    } else {
      return (q[key] = value, q)
    }
  }, {})
  return queryParams
}
