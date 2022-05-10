import { FC, ReactNode } from 'react';

export const ErrorStatus: FC<{ children?: ReactNode | undefined }> = (props) => {
  return (
    <div style={{ color: 'red' }}>
      { props.children || 'server error' }
    </div>
  );
};

