import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Loading, ErrorMessage } from '../../components/SpecComponents';
import { Container } from './ClientProductsList.styles';
import ProductCard from '../../components/cards/ProductCard';
import { openContactFormModal, getProducts, cleanProductList } from './ClientProductsList.actions';
import { getProduct } from '../spec-modal-product/SpecModalProduct.actions';


const ClientProductsList = () => {
  const { products, error, loading, params } = useSelector(state => state.clientProductsList);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const onClickProduct = selectedProduct => () => {
    dispatch(getProduct(selectedProduct));
  };

  const onClickContact = selectedProduct => () => {
    dispatch(openContactFormModal(selectedProduct));
  };

  useEffect(() => {
    if (!products.length) dispatch(getProducts({ ...params, client: id }));
    return () => dispatch(cleanProductList())
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;
  if (!products.length) return null;

  return (
    <Container>
      {products.map(product => (
        <ProductCard
          key={product.id}
          category={product.system?.name || ''}
          description={product.short_desc || product.long_desc}
          photo={product.images?.[0]?.urls?.small}
          reference={product.reference}
          title={product.name}
          onClickCard={onClickProduct(product)}
          onClickSeeMore={onClickProduct(product)}
          pdfs={product?.pdfs}
          dwg={product?.dwg}
          bim={product?.bim}
          productId={product.id}
        />
      ))}
    </Container>
  );
};

export default ClientProductsList;
