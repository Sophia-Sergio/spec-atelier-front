import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDropdown from '../basics/Dropdown.hooks';
import Dropdown from '../basics/Dropdown';
import {
	Root,
	Label,
	Section,
	Input,
	InputUnderline,
	DropIcon,
	Option,
	OptionCheckboxIcon,
	OptionText,
	Actions,
} from './MultiSelect.styles';
import checkboxOffSource from '../../assets/images/icons/checkbox-off.svg';
import checkboxOnSource from '../../assets/images/icons/checkbox-on.svg';
import dropArrowSource from '../../assets/images/icons/drop-arrow.svg';
import checkboxOnSecondarySource from '../../assets/images/icons/checkbox-on-secondary.svg';
import Button from '../buttons/Button';
import { VARIANTS_BUTTON } from '../../config/constants/button-variants';

/**
 * The MultiSelect' component.
 */
const MultiSelect = (props) => {
	const {
		disabled,
		label,
		options,
		placeholder,
		type,
		values: selectedOptions,
		width,
		onChange,
		variant,
		showButtons,
		onClean,
		onSubmit,
		optionAll,
		changeOnClose,
		offsetY,
	} = props;
	const {
		anchor,
		width: anchorWidth,
		onClick: handleClick,
		onClose: handleClose,
		onOpen: handleOpen,
	} = useDropdown({
		closeOnClick: false,
		clickCallback: (option, selected) => {
			const updatedOptions = selected
				? selectedOptions.filter(
						(selectOption) => selectOption.value !== option.value,
				  )
				: selectedOptions.concat(option);

			onChange(updatedOptions);
		},
	});
	const formatInputValue = () => {
		const optionsLabels = selectedOptions.map(
			(selectedOption) => selectedOption.label,
		);

		if (optionsLabels.length === 0) {
			return '';
		}

		if (optionsLabels.length === 1) {
			return optionsLabels.shift();
		}

		if (optionsLabels.length === 2) {
			return optionsLabels.join(', ');
		}

		return `${optionsLabels.shift()}, ${optionsLabels.shift()}, (+${
			optionsLabels.length
		})`;
	};

	const [lastState, setLastState] = useState([]);

	const handleClickClean = () => {
		onChange([]);
		if (onClean) onClean([]);
	};

	const handleClickSubmit = () => {
		onSubmit(selectedOptions);
		handleClose();
	};

	const handleCloseBehaviour = () => {
		if (!changeOnClose) onChange(lastState);
		if (changeOnClose) onSubmit(selectedOptions);
		handleClose();
	};

	const onOpen = (e) => {
		setLastState(changeOnClose ? options : []);
		handleOpen(e);
	};

	const handleClickOptionAll = (selected) => () => {
		const updatedOptions = selected ? [] : options;
		onChange(updatedOptions);
	};
	const allSelected = options.length === selectedOptions.length;
	const checkboxIconOn =
		variant === 'primary' ? checkboxOnSource : checkboxOnSecondarySource;

	return (
		<Root>
			{label && <Label>{label}</Label>}
			<Section onClick={disabled ? undefined : onOpen}>
				{type === 'default' && (
					<Input
						readOnly
						disabled={disabled}
						placeholder={placeholder}
						value={formatInputValue()}
					/>
				)}
				{type === 'underline' && (
					<InputUnderline
						readOnly
						disabled={disabled}
						placeholder={placeholder}
						value={formatInputValue()}
					/>
				)}
				<DropIcon alt="" src={dropArrowSource} />
			</Section>
			<Dropdown
				anchorRef={anchor}
				maxHeight="212px"
				offset={{ x: 0, y: offsetY || 14 }}
				open={Boolean(anchor)}
				width={width || anchorWidth}
				onClose={handleCloseBehaviour}
			>
				{optionAll && (
					<Option onClick={handleClickOptionAll(allSelected)}>
						<OptionCheckboxIcon
							src={allSelected ? checkboxIconOn : checkboxOffSource}
						/>
						<OptionText>Todas</OptionText>
					</Option>
				)}
				{options.map((option) => {
					const selected = selectedOptions.find(
						(selectedOption) => selectedOption.value === option.value,
					);

					return (
						<Option key={option.value} onClick={handleClick(option, selected)}>
							<OptionCheckboxIcon
								src={selected ? checkboxOnSource : checkboxOffSource}
							/>
							<OptionText title={option.label}>{option.label}</OptionText>
						</Option>
					);
				})}
				{showButtons && (
					<Actions>
						<Button
							variant={VARIANTS_BUTTON.CANCEL_SECONDARY}
							onClick={handleClickClean}
						>
							Borrar
						</Button>
						<Button variant={variant} onClick={handleClickSubmit}>
							Guardar
						</Button>
					</Actions>
				)}
			</Dropdown>
		</Root>
	);
};

MultiSelect.defaultProps = {
	changeOnClose: true,
	disabled: false,
	label: '',
	placeholder: '',
	type: 'default',
	width: '275px',
	variant: 'primary',
	showButtons: false,
	optionAll: true,
	onSubmit: () => undefined,
	onClean: () => undefined,
};
MultiSelect.propTypes = {
	changeOnClose: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	variant: PropTypes.oneOf(['primary', 'secondary']),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
		}),
	).isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(['default', 'underline']),
	values: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	).isRequired,
	width: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
	onClean: PropTypes.func,
	showButtons: PropTypes.bool,
	optionAll: PropTypes.bool,
};

export default MultiSelect;
