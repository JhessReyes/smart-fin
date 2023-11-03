export const PLANS = `query Plans($page: Int, $limit: Int) {
    plans(page: $page, limit: $limit) {
      length
      pages
      rows {
        id
        name
        price
      }
    }
  }`