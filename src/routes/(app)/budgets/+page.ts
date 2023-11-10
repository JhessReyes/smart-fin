
import { queryFetch } from '$lib/client/index.js';
import { error } from '@sveltejs/kit'

export const load = async ({ parent }) => {
    const { queryClient } = await parent()

    const ME = `query Me {
        me {
          id
          name
          email
          currency
          budgets {
            id
            status
            categories {
              amount
              category {
                id
                name
              }
            }
          }
          transactions {
            id
            amount
            category {
              name
              id
            }
            date
          }
        }
      }`;

    // You need to use the SvelteKit fetch function here
    try {
        queryClient.invalidateQueries(['Me']);
        await queryClient.prefetchQuery({
            queryKey: ["Me"],
            queryFn: async () => {
                return queryFetch({
                    query: ME,
                })();
            }
        })
    } catch (err) {
        console.log('Error: ', err);
        // @ts-ignore
        throw error(err.status, err.message)
    }
}