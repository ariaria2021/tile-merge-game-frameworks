import React from 'react';
import type { Grid } from '@game-frameworks/shared/types';
import { Tile } from './Tile';
import styles from '../styles/Board.module.css';

type Props = {
    grid: Grid;
};

export const Board: React.FC<Props> = ({ grid }) => {
    // グリッドからフラットなタイル配列を生成（null除外）
    const tiles = grid.flat().filter(cell => cell !== null);

    return (
        <div className={styles.boardContainer}>
            {/* 背景グリッド */}
            <div className={styles.gridContainer}>
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={styles.gridCell} />
                ))}
            </div>

            {/* タイルレイヤー */}
            <div className={styles.tileContainer}>
                {tiles.map((cell) => (
                    <Tile key={cell!.id} cell={cell!} />
                ))}
            </div>
        </div>
    );
};
