import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  color: #212121;
  display: block;
  font-family: Lato;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 0 0 18px;
  width: 100%;
`;

export const Textarea = styled.textarea`
  background-color: transparent;
  border: 1px solid #D6D6D6;
  border-radius: 4px;
  color: #212121;
  font-family: Lato;
  font-size: 12px;
  letter-spacing: 1px;
  min-height: 152px;
  padding: 11px 19px;
  resize: none;
  width: 100%;

  &:active, &:focus {
    outline: 0;
  }

  &::placeholder {
    color: rgba(33, 33, 33, 0.46);
  }
`;