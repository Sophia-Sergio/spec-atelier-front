import React from 'react';
import AlertContainer from '../containers/alert/Alert.container';
import SpecHeaderContainer from '../containers/spec-header/SpecHeader.container';
import SpecDocumentContainer from '../containers/spec-document/SpecDocument.container';
import SpecNavigatorContainer from '../containers/spec-navigator/SpecNavigator.container';
import SpecProductsSectionsContainer from '../containers/spec-products-sections/SpecProductsSections.container';
import SpecProductsItemsContainer from '../containers/spec-products-items/SpecProductsItems.container';
import SpecDocumentPreviewContainer from '../containers/spec-document-preview/SpecDocumentPreview.container';
import SpecProductsContainer from '../containers/spec-products/SpecProducts.container';
import SpecPanelsLayout from '../components/layouts/SpecPanelsLayout';
import { Root, Header, Main, Navigation, Panels } from './Specification.styles';

/**
 * The Specification's view.
 */
const Specification = () => {
  return (
    <>
      <Root>
        <Header>
          <SpecHeaderContainer />
        </Header>
        <Main>
          <SpecDocumentContainer />
          <Navigation>
            <SpecNavigatorContainer />
            <Panels>
              <SpecPanelsLayout>
                <SpecProductsSectionsContainer />
                <SpecProductsItemsContainer />
                <SpecDocumentPreviewContainer />
              </SpecPanelsLayout>
              <SpecProductsContainer />
            </Panels>
          </Navigation>
        </Main>
      </Root>
      <AlertContainer />
    </>
  );
};

export default Specification;
