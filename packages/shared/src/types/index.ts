export type Cell = {
    id: string;
    value: number;
    position: [number, number];
    mergedFrom?: Cell[];
    isNew?: boolean;
};

export type Grid = (Cell | null)[][];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameState = {
    grid: Grid;
    score: number;
    bestScore: number;
    gameStarted: boolean;
    gameOver: boolean;
};
