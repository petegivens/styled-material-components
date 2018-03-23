import React from 'react';
import styled from 'styled-components';
import { iconPaths } from './iconPaths';

const IconComponent = ({ className, children, fill, size, icon }) => {
  const DEFAULT_FILL = 'rgb(0, 0, 0)';
  const DEFAULT_SIZE = 24;
  const PathComponent = icon && iconPaths[icon];
  return (
    <svg
      className={className}
      fill={fill || DEFAULT_FILL}
      height={size || DEFAULT_SIZE}
      width={size || DEFAULT_SIZE}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-smc="Icon"
    >
      {PathComponent ? <PathComponent /> : children}
    </svg>
  );
};

export const Icon = styled(IconComponent)``;
