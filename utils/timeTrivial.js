function createHistory () {
  class History {
    constructor () {
      this.present = {
        num: null
      }
      this.historyCache = {
        prev: [],
        current: null,
        after: []
      }
    }
    push (item) {
      const { historyCache } = this
      if (historyCache.current) {
        const { current } = historyCache
        historyCache.prev.push(current)
      }
      // 第一次添加事件
      historyCache.current = item
      // 更新 present
      this.present.num = historyCache.current.num
    }
    undo () {
      const { historyCache } = this
      if (historyCache.current && historyCache.prev.length) {
        historyCache.after.unshift(historyCache.current)
        historyCache.current = historyCache.prev.pop()
        this.present.num =  historyCache.current.num
      }
    }
    redo () {
      const { historyCache } = this
      if (historyCache.current && historyCache.after.length) {
        const newCur = historyCache.after.shift()
        const cur = historyCache.current
        historyCache.prev.push(cur)
        historyCache.current = newCur
        this.present.num =  historyCache.current.num
      }
    }

    gotoState (index) {
      const { prev, current, after } = this.historyCache
      const allState = [...prev, current, ...after]
      this.historyCache.current = allState[index]
      this.historyCache.prev = allState.slice(0, index)
      this.historyCache.after = allState.slice(index + 1)
      this.present.num =  this.historyCache.current.num
    }

  }  
  return new History()
}
module.exports = createHistory;