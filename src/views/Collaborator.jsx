import React from 'react';
import { useParams } from 'react-router';
import AppLayout from '../components/layouts/AppLayout';
import Navbar from '../containers/navbar/Navbar.container';
import Footer from '../components/footer';
import { Container } from './Collaborator.styles';
import ClientInfoContainer from '../containers/client/client.container';
import ProductsListContainer from '../containers/products-list/ProductsList.container';
import ContactFormModalContainer from '../containers/modal-contact-form/ModalContactForm.container';
import ProductModalContainer from '../containers/spec-modal-product/SpecModalProduct.container';

const Collaborator = () => {
	const { id } = useParams();
	return (
		<AppLayout footer={<Footer />} header={<Navbar />}>
			<Container>
				<ClientInfoContainer />
				<ProductsListContainer
					extraFilters={{ limit: 6, client: id }}
					withFilter={false}
					withSearch={false}
					viewKey='brand_products'
				/>
				<ContactFormModalContainer type="client" />
				<ProductModalContainer />
			</Container>
		</AppLayout>
	);
};

export default Collaborator;
