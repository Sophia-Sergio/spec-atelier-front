import React, { useEffect, useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import isDeepEqual from 'fast-deep-equal/react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Container,
	ListContainer,
	Separator,
	BodyHeader,
	Total,
	Sort,
	MobileFilters,
	Filters,
} from './ProductsList.styles';
import {
	setFilters,
	onGetProducts,
	setSelectedAll,
	cleanStoreProductList,
} from './ProductsList.actions';
import { getProduct } from '../spec-modal-product/SpecModalProduct.actions';
import { Loading, ErrorMessage } from '../../components/SpecComponents';
import ProductCard from '../../components/cards/ProductCard';
import DropdownMenu from '../../components/menus/DropdownMenu';
import ProductsListSeeMore from './ProductsListSeeMore';
import ProductsSearchContainer from '../search/Search.container';
import ProductsFiltersContainer from '../products-filters/ProductsFilters.container';
import { useDidUpdateEffect } from '../../helpers/custom-hooks.helper';
import {
	DEFAULT_FILTER_KEYS,
	FILTER_OPTIONS,
} from '../../config/constants/products';

const ProductList = ({
	extraFilters,
	withSearch = true,
	withFilter = true,
	filterOptionsKey,
	withoutPadding,
	canAdd,
	canEdit,
	canDelete,
	selectedProducts = [],
	customEmpty,
	emptyListComponent: EmptyListComponent,
	onActionCard,
	onClickCreate,
	isSpec,
	viewKey,
}) => {
	const defaultFilters = {
		page: 0,
		limit: 10,
		keyword: '',
		section: [],
		room_type: [],
		project_type: [],
		specification: [],
		item: [],
		subitem: [],
		client: [],
		filters: filterOptionsKey
			? FILTER_OPTIONS[filterOptionsKey]
			: DEFAULT_FILTER_KEYS,
		sort: '',
		with_products: true,
		most_used: false,
		my_products: false,
		view: viewKey,
	};
	const dispatch = useDispatch();
	const {
		products,
		error,
		loading,
		filters,
		total,
		filterOptions,
	} = useSelector((state) => state.productsList);
	const filtersRef = useRef(filters);
	if (!isDeepEqual(filtersRef.current, filters)) {
		filtersRef.current = filters;
	}

	const [keyword, setKeywords] = useState(filters.keyword || '');
	const [sortValue, setSortValue] = useState({});
	const initialFilters = {
		...defaultFilters,
		...extraFilters,
	};
	const [showMobileFilters, setShowMobileFilter] = useState(false);

	const onClickProduct = (selectedProduct) => (event) => {
		event.stopPropagation();
		dispatch(getProduct(selectedProduct));
	};

	const debouncedSave = useCallback(
		debounce(
			(name, newValue) =>
				dispatch(
					setFilters({
						[name]: newValue,
					}),
				),
			700,
		),
		[],
	);

	const onChangeParams = ({ target: { name, value } }) => {
		setKeywords(value);
		debouncedSave(name, value);
	};

	const onClickFilter = () => {
		setShowMobileFilter((current) => !current);
	};

	const onFilterAll = () => {
		dispatch(setFilters(initialFilters));
		dispatch(setSelectedAll(true));
		setKeywords('');
	};
	const handleSortChange = (option) => {
		setSortValue(option);
		dispatch(setFilters({ sort: option.value }));
	};

	useDidUpdateEffect(() => {
		const {
			section = [],
			room_type = [],
			project_type = [],
			item = [],
			subitem = [],
			brand = [],
			sort = '',
			keyword: storeKeyword = '',
			most_used,
			my_products,
			specification = [],
		} = filters;
		if (
			!storeKeyword &&
			!section.length &&
			!room_type.length &&
			!project_type.length &&
			!item.length &&
			!subitem.length &&
			!brand.length &&
			!specification.length &&
			!sort &&
			!most_used &&
			!my_products
		) {
			dispatch(setSelectedAll(true));
		} else {
			dispatch(setSelectedAll(false));
		}
		dispatch(onGetProducts(filters));
	}, [filtersRef.current]);

	useEffect(() => {
		dispatch(setFilters(initialFilters));
		return () => {
			dispatch(cleanStoreProductList());
		};
	}, []);

	return (
		<Container withoutPadding={withoutPadding}>
			{withSearch && (
				<ProductsSearchContainer
					keyword={keyword}
					onChangeParams={onChangeParams}
					onClickFilter={onClickFilter}
					placeholder="Buscar producto"
				/>
			)}
			{withFilter && (
				<>
					<Filters>
						<ProductsFiltersContainer
							filters={filters}
							initialFilters={initialFilters}
							onFilterAll={onFilterAll}
							filterOptions={filterOptions}
						/>
					</Filters>
					{showMobileFilters && (
						<MobileFilters>
							<ProductsFiltersContainer
								filters={filters}
								initialFilters={initialFilters}
								onFilterAll={onFilterAll}
								filterOptions={filterOptions}
							/>
						</MobileFilters>
					)}

					<Separator />
				</>
			)}
			<BodyHeader>
				{loading && 'Cargando...'}
				{!!products.length && !loading && (
					<>
						<Sort>
							<DropdownMenu
								options={[
									{ label: 'Nuevos', value: 'created_at' },
									{ label: 'Más usados', value: 'most_used' },
								]}
								placeholder="Ordenar por"
								value={sortValue}
								width="179px"
								onChange={handleSortChange}
							/>
						</Sort>
						<Total>{`${products.length} de ${total} producto(s)`}</Total>
					</>
				)}
			</BodyHeader>
			{error && <ErrorMessage />}
			{loading && (
				<Container>
					<Loading />
				</Container>
			)}
			{!products.length && !loading && !customEmpty && (
				<Container>No Hay Productos</Container>
			)}
			{!products.length && !loading && customEmpty && (
				<EmptyListComponent onClickCreate={onClickCreate} />
			)}
			<ListContainer>
				{products.map((product) => {
					const selected = selectedProducts.find(
						(selectedProduct) =>
							selectedProduct?.element.original_product_id === product.id,
					);
					return (
						<ProductCard
							key={product.id}
							category={product.system?.name || ''}
							description={product.short_desc || product.long_desc}
							photo={product.images[0]?.urls?.small}
							reference={product.reference}
							title={product.name}
							onClickCard={onActionCard?.(product) || onClickProduct(product)}
							onClickSeeMore={onClickProduct(product)}
							pdfs={product?.pdfs}
							dwg={product?.dwg}
							bim={product?.bim}
							productId={product.id}
							selected={
								isSpec
									? product?.project_spec_info?.items_full_used
									: Boolean(selected)
							}
							canAdd={canAdd}
							canEdit={canEdit}
							canDelete={canDelete}
							specInfo={product?.project_spec_info}
							itemsUsed={
								product?.project_spec_info?.items_used.length > 0 &&
								product?.project_spec_info?.items_used.length <
									product.items.length
							}
						/>
					);
				})}
			</ListContainer>
			<ProductsListSeeMore filters={filters} />
		</Container>
	);
};

export default ProductList;
