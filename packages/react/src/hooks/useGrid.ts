import { useState, useCallback } from 'react';
import type { Grid, Direction } from '@game-frameworks/shared/types';
import { createEmptyGrid, addRandomTile } from '@game-frameworks/shared/utils';
import { rotateRight, rotateLeft, processRow } from '@game-frameworks/shared/utils';

export const useGrid = () => {
    const [grid, setGrid] = useState<Grid>(() => {
        let initialGrid = createEmptyGrid();
        initialGrid = addRandomTile(initialGrid);
        initialGrid = addRandomTile(initialGrid);
        return initialGrid;
    });

    const move = useCallback((direction: Direction) => {
        let moved = false;
        let totalScore = 0;

        let processingGrid = [...grid];

        // 方向に応じて回転
        if (direction === 'RIGHT') processingGrid = rotateRight(rotateRight(processingGrid));
        if (direction === 'UP') processingGrid = rotateLeft(processingGrid);
        if (direction === 'DOWN') processingGrid = rotateRight(processingGrid);

        // 各行を処理
        const newRows = processingGrid.map((row) => {
            const { newRow, score } = processRow(row);
            totalScore += score;
            return newRow;
        });

        // 元の向きに戻す
        let computedGrid = newRows;
        if (direction === 'RIGHT') computedGrid = rotateLeft(rotateLeft(computedGrid));
        if (direction === 'UP') computedGrid = rotateRight(computedGrid);
        if (direction === 'DOWN') computedGrid = rotateLeft(computedGrid);

        // 変更チェック
        const isChanged = JSON.stringify(grid.map(r => r.map(c => c?.value))) !==
            JSON.stringify(computedGrid.map(r => r.map(c => c?.value)));

        if (isChanged) {
            moved = true;

            // 新しいタイルを追加
            let finalGrid = addRandomTile(computedGrid);

            // position修正
            finalGrid = finalGrid.map((row, r) =>
                row.map((cell, c) =>
                    cell ? { ...cell, position: [r, c] } : null
                )
            );

            setGrid(finalGrid);
        }

        return { moved, score: totalScore };
    }, [grid]);

    const resetGrid = useCallback(() => {
        let newGrid = createEmptyGrid();
        newGrid = addRandomTile(newGrid);
        newGrid = addRandomTile(newGrid);
        setGrid(newGrid);
    }, []);

    return { grid, move, resetGrid };
};
