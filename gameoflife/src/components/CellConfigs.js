import React from 'react';
import './index.css';
import Cell from './Cell';

const CellConfigs = () => {

  const data = {
    configs: [
      {
        config1: [
          {
            cellClass: "box off",
            key: '0_0',
            cellId: '0_0',
            row: 0,
            col: 0,
          },
          {
            cellClass: "box on",
            key: '0_1',
            cellId: '0_1',
            row: 0,
            col: 1,
          },
          {
            cellClass: "box on",
            key: '1_0',
            cellId: '1_0',
            row: 1,
            col: 0,
          },
          {
            cellClass: "box on",
            key: '1_1',
            cellId: '1_1',
            row: 1,
            col: 1,
          }
        ]
      },
    ]
  }

  return data;

}

export default CellConfigs;