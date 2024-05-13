import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PRODUCTS_COUNT = gql`
  query PRODUCTS_COUNT {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, error, loading } = useQuery(PRODUCTS_COUNT);
  console.log(data, error, loading);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick fits — Page {page} of ___</title>
      </Head>
      <Link href={`/products/${parseInt(page) - 1}`} aria-disabled={page <= 1}>
        {' '}
        Prev
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items total</p>
      <Link
        href={`/products/${parseInt(page) + 1}`}
        aria-disabled={page >= pageCount}
      >
        Next{' '}
      </Link>
    </PaginationStyles>
  );
}
