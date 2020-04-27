import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, SecondaryButton, DefaultButton, GrayButton, CancelButton } from './Button.styles';

/**
 * The Button's component.
 */
const Button = props => {
  const { variant, ...buttonProps } = props;

  if (variant === 'primary') {
    return <PrimaryButton {...buttonProps} />;
  }

  if (variant === 'secondary') {
    return <SecondaryButton {...buttonProps} />;
  }

  if (variant === 'gray') {
    return <GrayButton {...buttonProps} />;
  }

  if (variant === 'cancel') {
    return <CancelButton {...buttonProps} />
  }

  return <DefaultButton {...buttonProps} />;
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  variant: 'default',
  width: 'initial',
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'default', 'gray', 'cancel']),
  width: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;