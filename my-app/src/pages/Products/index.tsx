import ConfirmModal from '../../components/ConfirmModal';
import ProductCard from '../../components/ProductCard';
import ProductControls from '../../components/ProductControls';
import ProductForm from '../../components/ProductForm';
import { useProductsPage } from '../../hooks/useProductsPage';
import './style.css';

export default function Products() {
  const vm = useProductsPage();

  return (
    <section className="products-page">
      <header className="products-page__header">
        <h2 className="products-page__title">Products</h2>
        <ProductControls isLoading={vm.loading} onAddProduct={vm.openCreateForm} onRefresh={vm.refreshProducts} />
      </header>
      <ProductForm
        isOpen={vm.isFormOpen}
        mode={vm.formMode}
        formData={vm.formData}
        isSubmitting={vm.loading}
        onFormChange={vm.setFormData}
        onSubmit={() => void vm.submitForm()}
        onClose={vm.closeForm}
      />
      {vm.message ? <p className="products-page__feedback products-page__feedback--success">{vm.message}</p> : null}
      {vm.loading ? <p className="products-page__feedback">Loading...</p> : null}
      {vm.validationError ? <p className="products-page__feedback products-page__feedback--error">{vm.validationError}</p> : null}
      {vm.error ? <p className="products-page__feedback products-page__feedback--error">{vm.error}</p> : null}
      <div className="products-page__grid">
        {!vm.loading && !vm.error && !vm.validationError
          ? vm.items.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={`${index * 40}ms`}
              onEdit={vm.openEditForm}
              onDelete={vm.requestDelete}
            />
          ))
          : null}
      </div>
      <ConfirmModal
        isOpen={Boolean(vm.productToDelete)}
        title="Delete product?"
        message={vm.productToDelete ? `This action will delete "${vm.productToDelete.title}".` : ''}
        isLoading={vm.loading}
        onCancel={vm.cancelDelete}
        onConfirm={() => void vm.confirmDelete()}
      />
    </section>
  );
}
