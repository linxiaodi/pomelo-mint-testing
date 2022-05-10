import React, { FC, useState } from 'react';

export type QQSearchProps = {
  onChange: (qq: string) => unknown
}

export const QQSearch: FC<QQSearchProps> = (props) => {
  const { onChange } = props;
  const [value, setState] = useState('')
  return (
    <div style={{ marginBottom: 10 }}>
      <span>QQ: </span>
      <input
        value={value}
        onInput={(e) => {
          const val = (e.target as HTMLInputElement).value;
          if (/^[0-9]+?$/.test(val) || !val) {
            setState(val)
            onChange(val)
          }
        }}
        type="text"
      />
    </div>
  );
};

