import { css, SerializedStyles } from '@emotion/core';

export const BreakPoints = {
  Mobile: 240,
  Tablet: 912,
  Desktop: 1236,
};

export const mobile = (style: SerializedStyles): SerializedStyles => css`
  @media (min-width: ${BreakPoints.Tablet}px) {
    ${style};
  }
`;

export const desktop = (style: SerializedStyles): SerializedStyles => css`
  @media (min-width: ${BreakPoints.Desktop}px) {
    ${style};
  }
`;
