import { combineReducers } from 'redux';
import loginReducer from '../../reducers/login.reducer';
import recoverPasswordReducer from '../../reducers/recover_password.reducer';
import newPasswordReducer from '../../reducers/new_password.reducer';
import alertReducer from '../../containers/alert/Alert.reducer';
import productsListReducer from '../../containers/products-list/ProductsList.reducer';
import specProductsSectionsReducer from '../../containers/spec-products-sections/SpecProductsSections.reducer';
import specProductsItemsReducer from '../../containers/spec-products-items/SpecProductsItems.reducer';
import specProductsReducer from '../../containers/spec-products/SpecProducts.reducer';
import specModalPorductReducer from '../../containers/spec-modal-product/SpecModalProduct.reducer';
import specCreateProductReducer from '../../containers/spec-create-product/SpecCreateProduct.reducer';
import specEditProductReducer from '../../containers/spec-edit-product/SpecEditProduct.reducer';
import authReducer from '../../containers/auth/auth.reducer';
import projectsListReducer from '../../containers/projects-list/ProjectsList.reducer';
import newProjectReducer from '../../containers/project-create/ProjectCreate.reducer';
import appReducer from './app-store/app.reducer';
import brandListReducer from '../../containers/brands-list/BrandsList.reducer';
import brandReducer from '../../containers/brand/brand.reducer';
import brandsSliderReducer from '../../containers/brand-slider/BrandSlider.reducer';
import brandProductsListReducer from '../../containers/brand-products-list/BrandProductsList.reducer';
import modalContactFormReducer from '../../containers/modal-contact-form/ModalContactForm.reducers';
import specDocumentReducer from '../../containers/spec-document/SpecDocument.reducer';
import specHeaderReducer from '../../containers/spec-header/SpecHeader.reducer';
import specImagesModalReducer from '../../containers/spec-images-modal/SpecImagesModal.reducer';
import specContentsReducer from '../../containers/spec-contents/SpecContents.reducer';

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  brand: brandReducer,
  brandsSlider: brandsSliderReducer,
  brandsList: brandListReducer,
	login: loginReducer,
	recoverPassword: recoverPasswordReducer,
  modalContactForm: modalContactFormReducer,
  newPassword: newPasswordReducer,
  newProject: newProjectReducer,
  projectsList: projectsListReducer,
  alert: alertReducer,
  brandProductsList: brandProductsListReducer,
  productsList: productsListReducer,
  specHeader: specHeaderReducer,
  specProductsSections: specProductsSectionsReducer,
  specProductsItems: specProductsItemsReducer,
  specProducts: specProductsReducer,
  specModalPorduct: specModalPorductReducer,
  specCreateProduct: specCreateProductReducer,
  specEditProduct: specEditProductReducer,
  specDocument: specDocumentReducer,
  specImagesModal: specImagesModalReducer,
  specContents: specContentsReducer,
});
