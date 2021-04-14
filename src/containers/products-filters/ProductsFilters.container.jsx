import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../products-list/ProductsList.actions';
import { Button } from '../../components/SpecComponents';
import { Container, Content, Text } from './ProductsFilters.styles';
import ButtonComboBox from './ButtonComboBox';
import { FILTER_VALUE } from '../../config/constants/products';

/**
 * The ProductsFilters's container.
 */
const ProductsFilters = ({
	initialFilters,
	filters,
	onFilterAll,
	filterOptions,
}) => {
	const { isSelectedAll } = useSelector((state) => state.productsList);

	const dispatch = useDispatch();

	const submitCallback = ({ name, value }) => {
		dispatch(setFilters({ ...filters, [name]: value, page: 0 }));
	};

	return (
		<Container>
			<Content>
				<Button
					selected={isSelectedAll}
					onClick={onFilterAll}
					variant={isSelectedAll ? 'secondary' : 'default'}
					inverse
				>
					<Text>Todos</Text>
				</Button>
				{initialFilters.filters.map((key) => {
					if (key === 'most_used' || key === 'my_products') {
						return (
							<Button
								key={key}
								inverse
								variant={filters[key] ? 'secondary' : 'default'}
								name={key}
								onClick={() =>
									submitCallback({
										name: 'most_used',
										value: !filters[key],
									})
								}
							>
								<Text>{FILTER_VALUE[key].text}</Text>
							</Button>
						);
					}
					return (
						<ButtonComboBox
							key={key}
							variant="secondary"
							options={filterOptions?.[FILTER_VALUE[key].valueKey] || []}
							name={key}
							onChange={submitCallback}
							currentOptions={filters[key]}
							submit
						>
							<Text>{FILTER_VALUE[key].text}</Text>
						</ButtonComboBox>
					);
				})}
			</Content>
		</Container>
	);
};

export default ProductsFilters;
