class Square {
    constructor(x = 0, y = 0, predecessor = 0) {
        this.x = x;
        this.y = y;
        this.predecessor = predecessor;
    }
}

function isLegalSquare(square) {
    if (square.x < 0 || square.x > 7 || square.y < 0 || square.y > 7) {
        return false;
    }
    return true;
}

const knightOffsets = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
];

function transformSquare(square, [x, y]) {
    return new Square(square.x + x, square.y + y, square);
}

function isNotVisited(visitedSquares, square) {
    return !visitedSquares.find(
        (value) => value.x == square.x && value.y == square.y,
    );
}

function findSolution(startSquare, [goalX, goalY]) {
    let movedToSquares = [startSquare];
    let visitedSquares = [startSquare];
    while (movedToSquares.length != 0) {
        let currentSquare = movedToSquares.at(0);
        movedToSquares.shift();

        // console.log("starting", currentSquare.x, currentSquare.y);
        for (const offset of knightOffsets) {
            let newSquare = transformSquare(currentSquare, offset);

            if (
                isLegalSquare(newSquare) &&
                isNotVisited(visitedSquares, newSquare)
            ) {
                // console.log("moving to", newSquare.x, newSquare.y);
                if (newSquare.x === goalX && newSquare.y === goalY) {
                    return newSquare;
                }
                visitedSquares.push(newSquare);
                movedToSquares.push(newSquare);
            }
        }
    }
    console.log("couldnt find");
}

function knightMoves([startX, startY], [endX, endY]) {
    const startSquare = new Square(startX, startY);
    const endSquare = findSolution(startSquare, [endX, endY]);

    let squares = [];
    let currentSquare = endSquare;
    while (true) {
        squares.push([currentSquare.x, currentSquare.y]);
        const nextSquare = currentSquare.predecessor;
        if (!nextSquare) {
            break;
        }
        currentSquare = nextSquare;
    }
    console.log(
        "solution to",
        startX,
        startY,
        endX,
        endY,
        "is",
        squares.reverse(),
    );
}
// knightMoves([0, 0], [3, 3]);
knightMoves([0, 0], [7, 7]);
// knightMoves([0, 0], [1, 2]);
