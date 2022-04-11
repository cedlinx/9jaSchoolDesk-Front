import React from 'react';
import { DropdownContainer } from './styles';

const Dropdown = ({ children, show, ...props }) => {
  return !show ? null : <DropdownContainer {...props}>{children}</DropdownContainer>;
};
export default Dropdown;
