import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading, Modal, Button, Image, ToolTip } from '../../components/SpecComponents';
import {
  ButtonClose,
  Container,
  Content,
  Header,
  Title,
  Section,
  ImagesContainer,
  ImagesContent,
  ProductImageSelectedContainer,
  ProductImageSelected,
  InfoContainer,
  InfoContent,
  ProductName,
  ProductDescription,
  ProductBrand,
  Actions,
  Icons,
  Icon,
} from './SpecModalProduct.styles';

import { closeModal } from './SpecModalProduct.actions';
import { openContactModal } from '../modal-contact-form/ModalContactForm.actions';


const SpecModalProduct = () => {
  let isMounted = true;
  const getFirstImg = data => (data?.images?.length && data.images[0]) || {};
  const { product, showModalProduct } = useSelector(state => state.specModalPorduct);
  const [selectedImg, selectImg] = useState(getFirstImg());
  const onSelectImg = img => () => selectImg(img);
  const dispatch = useDispatch();
  const onCloseModal = () => dispatch(closeModal());
  const isRegisteredClient = !!product?.client.id && !!product?.client.name;

  useEffect(() => {
    if (product && showModalProduct) selectImg(getFirstImg(product));
  }, [product, showModalProduct]);

  useEffect(() => {
    return () => { isMounted = false };
  }, []);

  const onContact = () => dispatch(openContactModal({
    selectedBrand: product.brand,
    selectedProduct: product,
  }));


  // Download documents
  const handleIconClick = documents => () => {
    documents.forEach(async doc => {
      const link = document.createElement("a");
      link.download = doc;
      link.href = doc;
      link.target = '_blank';
      link.id = 'doc';
      document.body.appendChild(link);
      link.click();
      return setTimeout(() => document.body.removeChild(link), 2000);
    });
  };

  if (!showModalProduct) return null;
  if (!product || !product.id) return <Loading />
  const titleSpecPdf = product?.pdfs?.map(s => s.name).join(' - ') || '';

  return (
    <Modal show={showModalProduct} onClose={onCloseModal}>
      <Container>
        <Content>
          <ButtonClose
            role="button"
            tabIndex="0"
            onKeyDown={onCloseModal}
            onClick={onCloseModal}
          >
            <i className="fas fa-times" />
          </ButtonClose>
          <Header>
            <Title>
              {`${product.name} / ${product.short_desc}`}
            </Title>
          </Header>
          <Section>
            <ImagesContainer>
              {!!product?.images?.length && product.images.map((img, i) =>
                <ImagesContent
                  key={img.id}
                  role="button"
                  tabIndex={i}
                  onKeyDown={onSelectImg(img)}
                  onClick={onSelectImg(img)}
                  active={!!(img.id && img.id === selectedImg.id && product?.images?.length > 1)}
                >
                  <Image src={img?.urls?.medium} type="responsive" height="80px" maxWidth="100%" objectFit="contains"/>
                </ImagesContent>
              )}
            </ImagesContainer>
            {/* Image primary */}
            <ProductImageSelectedContainer>
              <ProductImageSelected>
                <Image src={selectedImg?.urls?.medium} type="cover"  height="240px" objectFit="contains" />
              </ProductImageSelected>
            </ProductImageSelectedContainer>
            {/* Info Product */}
            <InfoContainer>
              <InfoContent>
                <ProductName>
                  {product.reference}
                </ProductName>
                <ProductDescription>
                  {product.long_desc}
                </ProductDescription>
                <ProductBrand>
                  {`Referencia: ${product?.systems?.first?.name || ''}: ${product?.brand?.name || ''}`}
                </ProductBrand>
                <Actions>
                  {
                    isRegisteredClient && 
                    (
                      <Button
                        variant="secondary"
                        onClick={onContact}
                      >
                        Contactar
                      </Button>
                    )
                  }
                  <Icons>
                    <ToolTip content={product?.dwg?.url?.split('/').pop() || ''} position="bottom">
                      <Icon
                        type="dwg"
                        active={!!product.dwg.url}
                        onClick={handleIconClick([product.dwg.url])}
                      />
                    </ToolTip>
                    <ToolTip content={product?.bim?.url?.split('/').pop() || ''} position="bottom">
                      <Icon
                        type="bim"
                        active={!!product.bim.url}
                        onClick={handleIconClick([product.bim.url])}
                      />
                    </ToolTip>
                    <ToolTip content={titleSpecPdf} position="bottom">
                      <Icon
                        type="tech"
                        active={!!product?.pdfs?.length}
                        onClick={handleIconClick(product.pdfs.map(({ url }) => url))}
                      />
                    </ToolTip>
                  </Icons>
                </Actions>
              </InfoContent>
            </InfoContainer>
          </Section>
        </Content>
      </Container>
    </Modal>
  );
};

export default SpecModalProduct;
