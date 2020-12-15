import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onHideSpecCreateProduct, onGetSpecProductsSystems, onShowSpecCreateProductStepTwoSuccess } from './SpecCreateProduct.actions';
import { onGetSpecProductsSections } from '../spec-products-sections/SpecProductsSections.actions';
import { onGetSpecProductsItems } from '../spec-products-items/SpecProductsItems.actions';
import { useInput, useSelect } from '../../components/inputs/Inputs.hooks';
import useModal from '../../components/layouts/ModalLayout.hooks';
import ModalLayout from '../../components/layouts/ModalLayout';
import StepsBubbles from '../../components/basics/StepsBubbles';
import Input from '../../components/inputs/Input';
import Select from '../../components/inputs/Select';
import Button from '../../components/buttons/Button';
import { Root, Header, Title, CloseIcon, Body, Section, Footer, InputButton, DropIcon, ButtonSelectorContent } from './SpecCreateProduct.styles';
import closeSource from '../../assets/images/icons/close.svg';
import SelectorRelative from '../../components/basics/SelectorRelative';
import dropArrowSource from '../../assets/images/icons/drop-arrow.svg';

/**
 * The SpecCreateProductStepOne's container.
 */
const SpecCreateProductStepOne = () => {
  const { name, item, section, show, system } = useSelector(state => state.specCreateProduct.stepOne);
  const { collection: sections } = useSelector(state => state.specProductsSections);
  const { collection: items } = useSelector(state => state.specProductsItems);
  const { systemsCollection: systems } = useSelector(state => state.specCreateProduct);
  const dispatch = useDispatch();
  const { onChange: handleNameChange, set: setNameValue, value: nameValue } = useInput(name);
  const { onChange: onSectionChange, set: setSectionValue, value: sectionValue } = useSelect(section);
  const { onChange: onItemChange, set: setItemValue, value: itemValue } = useSelect(item);
  const { onChange: handleSystemChange, set: setSystemValue, value: systemValue } = useSelect(system);
  const handleSectionChange = option => {
    onSectionChange(option);
    setItemValue({});
    setSystemValue({});
    dispatch(onGetSpecProductsItems({ sectionID: option.value }));
  };
  const handleItemChange = option => {
    onItemChange(option);
    setSystemValue({});
    dispatch(onGetSpecProductsSystems({ itemID: option.value }));
  };
  const { onClose: handleClose, onExiting: handleExiting } = useModal({
    closeCallback: () => dispatch(onHideSpecCreateProduct()),
    exitingCallback: () => {
      setNameValue('');
      setSectionValue({});
      setItemValue({});
      setSystemValue({});
    },
  });
  const handleNext = () => dispatch(onShowSpecCreateProductStepTwoSuccess({
    name: nameValue,
    section: sectionValue,
    item: itemValue,
    system: systemValue,
  }));
  const disableSection = !systemValue.label && systems.length;
  const disabledNext = !nameValue || !itemValue.label || disableSection;

  useEffect(() => {
    if (!show) {
      return;
    }

    dispatch(onGetSpecProductsSections());
  }, [show]);

  const mapToSelector = sectionOption => ({ ...sectionOption, label: sectionOption.name, value: sectionOption.id });

  useEffect(() => {
    if (sections && section?.id) {
      setSectionValue(mapToSelector(sections.find(i => i.id === section.id)));
      dispatch(onGetSpecProductsItems({ sectionID: section.id }));
    }
  }, [section]);


  useEffect(() => {
    if (items && item?.id) {
      setItemValue(mapToSelector(items.find(i => i.id === item.id)));
      dispatch(onGetSpecProductsSystems({ itemID: item.id }));
    }
  }, [item]);

  return (
    <ModalLayout show={show} onClose={handleClose} onExiting={handleExiting}>
      <Root>
        <Header>
          <Title>Crear producto</Title>
          <CloseIcon alt="Cerrar" src={closeSource} onClick={handleClose} />
        </Header>
        <Body>
          <Section>
            <StepsBubbles prefix="step-1" steps={[{ active: true }, { active: false }, { active: false }]} />
          </Section>
          <Section padding="41px 0 0">
            <Input
              label="Nombre del producto"
              placeholder="Nombre"
              value={nameValue}
              width="490px"
              onChange={handleNameChange}
            />
          </Section>
          <Section alignItems="flex-end" display="grid" gridTemplateColumns="1fr 1fr 1fr" padding="36px 0 0">
            <SelectorRelative
              name="sort"
              type="underline"
              options={sections.map(mapToSelector)}
              value={sectionValue}
              onChange={handleSectionChange}
              maxHeight="160px"
              renderInput={(
                <ButtonSelectorContent>
                  <InputButton readOnly placeholder="Categoriza el producto" value={sectionValue.label || ''} />
                  <DropIcon alt="" src={dropArrowSource} />
                </ButtonSelectorContent>
              )}
            />
            <SelectorRelative
              options={items.map(mapToSelector)}
              value={itemValue}
              onChange={handleItemChange}
              maxHeight="160px"
              renderInput={(
                <ButtonSelectorContent disabled={!sectionValue.value}>
                  <InputButton readOnly placeholder="Elige una partida" value={itemValue.label || ''} disabled={!sectionValue.value}/>
                  <DropIcon alt="" src={dropArrowSource} />
                </ButtonSelectorContent>
              )}
            />
             <SelectorRelative
              options={systems.map(mapToSelector)}
              value={systemValue}
              onChange={handleSystemChange}
              maxHeight="160px"
              renderInput={(
                <ButtonSelectorContent disabled={!itemValue.value || !systems.length}>
                  <InputButton readOnly placeholder="Elige una partida" value={systemValue.label || ''} disabled={!itemValue.value || !systems.length} />
                  <DropIcon alt="" src={dropArrowSource} />
                </ButtonSelectorContent>
              )}
            />
          </Section>
        </Body>
        <Footer>
          <Button
            disabled={disabledNext}
            variant="primary"
            width="163px"
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </Footer>
      </Root>
    </ModalLayout>
  );
};

export default SpecCreateProductStepOne;
