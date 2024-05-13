import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage({ query }) {
  const page = query.page === 0 ? 1 : query.page;

  return (
    <div>
      <Pagination page={page} />
      <Products />
      <Pagination page={page} />
    </div>
  );
}
