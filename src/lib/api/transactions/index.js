export let TRANSACTIONS = `query Transactions($page: Int, $limit: Int) {
    transactions(page: $page, limit: $limit) {
      pages
      length
      rows {
        id
        description
        date
        amount
        category {
          id
          name
        }
      }
    }
  }
`