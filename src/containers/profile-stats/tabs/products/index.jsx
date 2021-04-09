import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { onGetStats } from '../../ProfileStats.actions';
import { COLUMNS } from './constants';
import TableStats from '../../components/table';

const ProductsStats = () => {
	const {
		filters,
		products: { list, loading, error },
	} = useSelector((state) => state.profileStats);
	const dispatch = useDispatch();
	const columns = useMemo(() => COLUMNS, []);

	useEffect(() => {
		if (!list.length)
			dispatch(
				onGetStats({
					...filters,
					stat: 'product_stats',
					page: 0,
					limit: 10,
				}),
			);
	}, []);

	return loading && !list.length ? (
		<h1>Loading...</h1>
	) : (
		<TableStats columns={columns} data={list} />
	);
};

export default ProductsStats;
