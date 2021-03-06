import { Movement } from "./movement";
import { Square } from "./square";

export class TableTop{
    squareMatrix: Square[][];
    //starting point can be northwest, northeast, southwest,southeast
    startingPoint: string;

    constructor(items: any){
        this.startingPoint = items.startingPoint || "SouthWest";
        this.squareMatrix = [];
        this.setTableTopByDirection();
    }

    getMatrixIndexOfSquare(squareIndex: string): Movement {
        let x_value = Number(squareIndex.split('_')[1]);
        let y_value = Number(squareIndex.split('_')[2]);
        let result: any = {x: -1, y: -1};
        this.squareMatrix.forEach((row,row_index) => {
            row.forEach((col, col_index) => {
                if(col.x == x_value && col.y == y_value){
                    result.x = col_index;
                    result.y = row_index;
                }
            });
        });
        result.direction = squareIndex.split('_')[3];
        return result;
    }

    setTableTopByDirection(){
        switch (this.startingPoint) {
            case 'NorthWest':
                this.squareMatrix = this.setTableTopByInputArrays([4,3,2,1,0], [0,1,2,3,4]);
                break;
            case 'NorthEast':
                this.squareMatrix = this.setTableTopByInputArrays([4,3,2,1,0],[4,3,2,1,0]);
                break;
            case 'SouthWest':
                this.squareMatrix = this.setTableTopByInputArrays([0,1,2,3,4], [0,1,2,3,4]);
                break;
            case 'SouthEast':
                this.squareMatrix = this.setTableTopByInputArrays([0,1,2,3,4],[4,3,2,1,0]);
                break;
        }
    }

    setTableTopByInputArrays(arr1: number[], arr2: number[]){
        return arr1.map(i => {
            return arr2.map(j => {
                return new Square(j,i);
            })
        });
    }
}
