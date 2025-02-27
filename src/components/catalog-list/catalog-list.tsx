import ProductCard from '../product-card/product-card';

function CatalogList():JSX.Element {
  return(
    <div className="cards catalog__cards">
      <ProductCard/>
    </div>
  );
}

export default CatalogList;
