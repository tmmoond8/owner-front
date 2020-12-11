/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

interface ProfilePhotoProps {
  className?: string;
  src?: string;
  onClick?: () => void;
  size?: number;
}

const defaultImage =
  'https://res.cloudinary.com/dgggcrkxq/image/upload/v1600597433/noticon/ayvhqsqwqbfr0dauelcv.png';

export default function ProfilePhoto(props: ProfilePhotoProps): JSX.Element {
  const { src, onClick, size = 32, className } = props;
  const handleClick = React.useCallback(() => {
    if (typeof onClick === 'function') {
      onClick();
    }
  }, [onClick]);
  return (
    <Photo
      className={className}
      src={src || defaultImage}
      size={size}
      onClick={handleClick}
    />
  );
}

const Photo = styled.img<{ src: string; size: number }>`
  width: ${(p) => p.size}px;
  min-width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  min-height: ${(p) => p.size}px;
  border-radius: ${(p) => p.size / 3}px;
  background: url(${(p) => p.src});
  background-size: contain;
`;
