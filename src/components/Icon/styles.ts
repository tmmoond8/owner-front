import { css, SerializedStyles } from '@emotion/core';
import { colors } from '../../styles';

export const base = css`
  display: block;
  width: 1em;
  height: auto;
  font-family: 'Inter', Helvetica, 'Apple Color Emoji', Arial, sans-serif,
    'Segoe UI Emoji', 'Segoe UI Symbol';
  fill: ${colors.blackD9};
  flex-shrink: 0;
  backface-visibility: hidden;
`;

export const customStyle = (p: { color?: string }): SerializedStyles => css`
  color: currentColor;
  fill: currentColor;
  ${p.color && `fill: ${p.color};`}
  ${p.color && `color: ${p.color};`}
`;

export const size = (size: string): SerializedStyles => css`
  width: ${size};
  min-height: ${size};
  & > svg {
    width: ${size};
  }
`;

export const iconButton = css`
  &.IconButton.Button {
    width: auto;
    height: 100%;
    &:hover {
      background-color: transparent;
    }
    &:active {
      background-color: transparent;
    }
  }
`;

export const disabled = css`
  opacity: 0.4;
  pointer-events: none;
  cursor: default;
`;
