import React from 'react';
import { useDispatch } from 'react-redux';
import { onShowSpecCreateProductSuccess } from '../spec-create-product/SpecCreateProduct.actions';
import { onShowSpecProductsSuccess } from '../spec-products/SpecProducts.actions';
import useDropdown from '../../components/basics/Dropdown.hooks';
import Dropdown from '../../components/basics/Dropdown';
import { Root, AddIcon, MenuItem } from './SpecDocument.styles';
import specAddSource from '../../assets/images/icons/spec-add.svg';

/**
 * The SpecDocument's container.
 */
const SpecDocument = () => {
  const dispatch = useDispatch();
  const {
    anchor,
    onClose: handleMenuClose,
    onOpen: handleMenuOpen,
  } = useDropdown({ clickCallback: option => onChange(option) });
  const handleShowProducts = () => {
    handleMenuClose();
    dispatch(onShowSpecProductsSuccess());
  };
  const handleCreateProduct = () => {
    handleMenuClose();
    dispatch(onShowSpecCreateProductSuccess());
  }; 

  return (
    <Root>
      <AddIcon alt="Agregar sección" src={specAddSource} onClick={handleMenuOpen} />
      <Dropdown
        anchorRef={anchor}
        offset={{ x: -15, y: -16 }}
        open={Boolean(anchor)}
        origin={{ x: 'right', y: 'top' }}
        onClose={handleMenuClose}
      >
        <MenuItem>Añadir texto</MenuItem>
        <MenuItem onClick={handleShowProducts}>Añadir producto</MenuItem>
        <MenuItem onClick={handleCreateProduct}>Crear producto</MenuItem>
      </Dropdown>
    </Root>
  );
};

export default SpecDocument;
