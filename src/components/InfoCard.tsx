import React, { FC } from 'react';
import { IQQInfo } from '../types';

export const InfoCard: FC<{ source: IQQInfo }> = (props) => {
  const { source } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img style={{ width: 100, height: 100, borderRadius: '50%', marginRight: 10 }} src={source.qlogo} alt=""/>
      <div>
        <p>qq number: {source.qq}</p>
        <p>qq name: {source.name}</p>
      </div>
    </div>
  );
};
