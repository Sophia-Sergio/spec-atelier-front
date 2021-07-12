import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useComboBox } from '../../components/inputs/Inputs.hooks';
import ComboBox from '../../components/inputs/ComboBox';
import { Button } from '../../components/SpecComponents';
import { Container, Content } from './ButtonComboBox.styles';
import { mapToSelector, isArraysEquals } from '../../helpers/helpers';

const propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		}),
	),
	currentOptions: PropTypes.arrayOf(PropTypes.object),
	name: PropTypes.string.isRequired,
	children: PropTypes.element,
	onChange: PropTypes.func,
	submit: PropTypes.bool.isRequired,
	onChangeSubmit: PropTypes.bool,
};

const defaultProps = {
	options: [],
	currentOptions: [],
	children: null,
	onChange: () => {},
	onChangeSubmit: false,
};

const ButtonComboBox = ({
	options,
	currentOptions,
	name,
	children,
	onChange,
	submit,
	variant,
	onChangeSubmit,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const [tempValues, setTempValues] = useState([]);

	const submitCallback = (value) => {
		setIsOpen(false);
		onChange({ name, value });
	};

	const { values, set, onSubmit } = useComboBox({
		initialValue: currentOptions,
		submitCallback,
	});

	const onChangeOption = (value) => {
		setTempValues(value);
		if (!onChangeSubmit) set(value);
	};

	const onClickOusite = (callback) => {
		const innerRef = useRef();
		const callbackRef = useRef();

		useEffect(() => {
			callbackRef.current = callback;
		});

		useEffect(() => {
			const handleClick = (e) => {
				if (
					innerRef.current &&
					callbackRef.current &&
					!innerRef.current.contains(e.target)
				) {
					callbackRef.current(e);
				}
			};
			document.addEventListener('click', handleClick);
			return () => document.removeEventListener('click', handleClick);
		}, []);
		return innerRef;
	};

	useEffect(() => {
		if (!currentOptions.length && values.length) {
			set([]);
		} else {
			set(currentOptions);
		}
	}, [currentOptions]);

	const innerRef = onClickOusite(() => {
		if (!isOpen) return;
		set(values);
		if (onChangeSubmit && !isArraysEquals(values, tempValues)) submitCallback(tempValues);
		else setIsOpen(false);
	});

	return (
		<Container isOpen={isOpen} ref={innerRef}>
			<Button
				inverse
				selected={values.length}
				variant={values.length ? 'secondary' : 'default'}
				onClick={toggle}
			>
				{children}
			</Button>
			<Content isOpen={isOpen}>
				<ComboBox
					variant={variant}
					options={options.map(mapToSelector)}
					placeholder="Selecciona"
					type="underline"
					values={values}
					onChange={onChangeOption}
					submit={submit}
					onSubmit={onSubmit}
					optionAll
					onChangeSubmit={onChangeSubmit}
				/>
			</Content>
		</Container>
	);
};

ButtonComboBox.propTypes = propTypes;
ButtonComboBox.defaultProps = defaultProps;

export default ButtonComboBox;
