import ProductCard from '../../components/ProductCard/ProductCard';
import ProductControls from '../../components/ProductControls/ProductControls';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useProductsPage } from '../../hooks/useProductsPage';
import './style.css';

export default function Products() {
  const vm = useProductsPage();

  return (
    <section className="products-page">
      <h2 className="products-page__title">Products</h2>
      <ProductControls
        productId={vm.productId}
        deleteId={vm.deleteId}
        onProductIdChange={vm.setProductId}
        onDeleteIdChange={vm.setDeleteId}
        onGetAll={vm.onGetAll}
        onGetOne={vm.onGetOne}
        onDelete={vm.onDelete}
      />
      <ProductForm formData={vm.formData} onFormChange={vm.setFormData} onCreate={() => void vm.onCreate()} />
      {vm.message ? <p className="products-page__feedback products-page__feedback--success">{vm.message}</p> : null}
      {vm.loading ? <p className="products-page__feedback">Loading...</p> : null}
      {vm.validationError ? <p className="products-page__feedback products-page__feedback--error">{vm.validationError}</p> : null}
      {vm.error ? <p className="products-page__feedback products-page__feedback--error">{vm.error}</p> : null}
      <div className="products-page__grid">
        {vm.single && !vm.validationError ? <ProductCard product={vm.single} selected /> : null}
        {!vm.loading && !vm.error && !vm.validationError ? vm.items.map((p, i) => <ProductCard key={p.id} product={p} animationDelay={`${i * 40}ms`} />) : null}
      </div>
    </section>
  );
}
