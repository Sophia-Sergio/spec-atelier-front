import moment from 'moment';

export const formatDate = (date, format = 'DD-MM-YYYY') => {
	const tempDate = moment(date);
	return tempDate.isValid() ? tempDate.format(format) : '';
};

export const mapToSelector = (data) => ({
	...data,
	label: data.name || data.label || '',
	value: data.id || data.value || data.name,
});

export const reorderList = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};
export const isArraysEquals = (a, b) =>
	Array.isArray(a) &&
	Array.isArray(b) &&
	a.length === b.length &&
	a.every((val, index) => val === b[index]);
