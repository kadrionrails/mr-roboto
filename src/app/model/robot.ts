import { directions } from "./enums";
import { Movement } from "./movement";
export class Robot{
    initiliazed: boolean;
    x: number = 0; // x coordinate of matrix not the value of square
    y: number = 0; // y coordinate of matrix not the value of square
    direction: string; // directions can be north, south, west, east

    constructor(items: any){
        this.initiliazed = items.square && items.direction;
        this.direction = items.direction.toUpperCase();
    }

    place(movement: Movement): boolean{
        if(movement.x == -1 || movement.y == -1 || !this.direction ){
            return false
        }
        this.x = movement.x;
        this.y = movement.y;
        this.direction = movement.direction;
        return true;
    }

    rotate(rotation: string){
        let increase_decrease = rotation == "LEFT" ? 1 : -1;
        let current_direction = directions[this.direction as keyof typeof directions];
        current_direction = (current_direction+ 4 + increase_decrease)%4;
        this.direction = directions[current_direction];
    }

    move(){
        let next_y = this.y, next_x = this.x;
        switch (this.direction) {
            case directions[0]:
                next_y++;
                break;
            case directions[1]:
                next_x--;
                break;
            case directions[2]:
                next_y--;
                break;
            case directions[3]:
                next_x++;
                break;
            default:
                break;
        }
        if(next_y <= 4 && next_y >= 0){
            this.y = next_y;
        }
        if(next_x <= 4 && next_x >= 0){
            this.x = next_x;
        }
    }

}