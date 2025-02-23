import React from 'react'
import Image from 'next/image';
import letterPath from './images/shape=letter.svg';
import lockPath from './images/shape=lock.svg';
import showPath from './images/shape=show.svg';
import hidePath from './images/shape=hide.svg';

interface IIconProps {
  type: 'letter' | 'lock' | 'show' | 'hide';
  alt?: string;
  [x: string]: any
}


function Icon({ type, alt = '', ...restProps }: IIconProps) {
  let src = '';

  switch (type) {
    case 'letter':
      src = letterPath;
      break;
    case 'lock':
      src = lockPath;
      break;
    case 'show':
      src = showPath;
      break;
    case 'hide':
      src = hidePath;
      break;

    default:
      throw new Error('Invalid icon type');
  }

  return <Image src={src} alt={alt} {...restProps} />;
}

export default Icon