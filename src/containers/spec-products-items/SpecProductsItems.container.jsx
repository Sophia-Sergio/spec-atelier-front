import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetSpecProductsByItem, onGetSpecProductsBySection } from '../spec-products/SpecProducts.actions';
import { onHideSpecProductsItemsSuccess } from './SpecProductsItems.actions';
import Breadcrumbs from '../../components/basics/Breadcrumbs';
import { Root, Header, Body, Loading, Item } from './SpecProductsItems.styles';

/**
 * The SpecProductsItems' container.
 */
const SpecProductsItems = () => {
  const { item: selectedItemID } = useSelector(state => state.specProducts.filters);
  const { collection: items, show } = useSelector(state => state.specProductsItems);
  const dispatch = useDispatch();
  const handleShowSections = () => {
    dispatch(onGetSpecProductsBySection({ sectionID: '', itemID: '' }));
    dispatch(onHideSpecProductsItemsSuccess());
  }
  const handleItemClick = itemID => () => itemID ? dispatch(onGetSpecProductsByItem({ itemID })) : () => {};

  if (!show) {
    return null;
  }

  return (
    <Root>
      <Header>
        <Breadcrumbs items={[{ label: 'Secciones', onClick: handleShowSections }, { label: 'Partidas' }]} />
      </Header>
      {items.length === 0 && <Loading>Cargando...</Loading>}
      {items.length > 0 && (
        <Body>
          {items.map(item =>
            <Item active={item.id === selectedItemID} key={item.id} onClick={handleItemClick(item.id)}>{item.name}</Item>
          )}
        </Body>
      )}
    </Root>
  )
};

export default SpecProductsItems;
