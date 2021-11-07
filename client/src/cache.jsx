import { InMemoryCache } from '@apollo/client';
import { makeVar } from '@apollo/client';

/* The InMemoryCache definition contains the favItemsVar as the reactive variable,
* which stores each user's favourites and updates other queries accordingly.
*/
export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favItems: {
            read() {
              return favItemsVar();
            }
          }
        }
      }
    }
  });


export const favItemsVar = makeVar();
  