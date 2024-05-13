import gql from 'graphql-tag';
import { PRODUCTS_COUNT } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      console.log(existing, args, cache);
      const { skip, first } = args;

      const data = cache.readQuery({ query: PRODUCTS_COUNT });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go the network to fetch them
        return false;
      }

      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache, just send them to apollo`
        );
        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when Apollo client comes back from the network with our products
      console.log(`Merging items form the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
