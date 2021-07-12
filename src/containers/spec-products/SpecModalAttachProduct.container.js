import React, { useState, useEffect } from 'react';
import { Modal, Button } from '../../components/SpecComponents';
import checkboxOffSource from '../../assets/images/icons/checkbox-off.svg';
import checkboxOnSource from '../../assets/images/icons/checkbox-on.svg';
import {
	Container,
	Content,
	ButtonClose,
	Header,
	Title,
	Section,
	OptionsList,
	SectionName,
	Separator,
	Options,
	Option,
	OptionCheckboxIcon,
	OptionText,
} from './SpecModalAttachProduct.styles';

function SpecModalAttachProduct({
	showAttachModal,
	onSubmit,
	onClose,
	product,
}) {
	const { items = [], sections = [], project_spec_info } = product;

	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleClickOption = (option, selected) => () => {
		const updatedOptions = selected
			? selectedOptions.filter((selectOption) => selectOption.id !== option.id)
			: selectedOptions.concat(option);

		setSelectedOptions(updatedOptions);
	};

	const handleOnSubmit = () => {
		onSubmit(selectedOptions, product);
		setSelectedOptions([]);
	};

	const handleClose = () => {
		setSelectedOptions([]);
		onClose();
	};

	return (
		<Modal show={showAttachModal} onClose={handleClose}>
			<Container>
				<Content>
					<ButtonClose
						role="button"
						tabIndex="0"
						onKeyDown={handleClose}
						onClick={handleClose}
					>
						<i className="fas fa-times" />
					</ButtonClose>
					<Header>
						<Title>¿Dónde quieres añadir la información?</Title>
					</Header>
					<Section>
						<OptionsList>
							{sections.map(({ id, name }) => (
								<Options key={id}>
									<Separator />
									<SectionName>{name}</SectionName>
									{items
										.filter(({ section_id }) => section_id === id)
										.map((item) => {
											const { id: itemId, name: itemName } = item;
											const selected = selectedOptions.find((selectedOption) => selectedOption.id === itemId);
											const isAdded = project_spec_info?.items_used.find((addedOption) => addedOption.id === itemId)
											return (
												<Option
													key={itemId}
													disabled={isAdded}
													onClick={!isAdded && handleClickOption(item, selected)}
												>
													<OptionCheckboxIcon
														src={
															(selected || isAdded) ? checkboxOnSource : checkboxOffSource
														}
													/>
													<OptionText>{itemName}</OptionText>
												</Option>
											);
										})}
								</Options>
							))}
						</OptionsList>
						<Button
							variant="primary"
							onClick={handleOnSubmit}
							disabled={!selectedOptions.length}
						>
							Añadir
						</Button>
					</Section>
				</Content>
			</Container>
		</Modal>
	);
}

export default SpecModalAttachProduct;
