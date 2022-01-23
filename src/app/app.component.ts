import { Component } from '@angular/core';
import { Robot } from './model/robot';
import { TableTop } from './model/table-top';
import { FormBuilder } from '@angular/forms';
import { commands } from './commands';
import { Movement } from './model/movement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mr-roboto';
  robot: Robot;
  tableTop: TableTop;
  oldCommands: string[] = [];
  report: string = "";
  placed: boolean = false;

  InputForm = this.formBuilder.group({
    command: '',
  });

  constructor(private formBuilder: FormBuilder){
    this.tableTop = new TableTop({});
    this.robot = new Robot({square:{x:0,y:0}, direction: "North"});
  }

  onSubmit(): void {
    let command = this.InputForm.value.command;
    if(command.match(/^PLACE \d{1},\d{1},\w{4,5}/)){ //regEx for PLACE + SPACE + 1DIGITT + , + 1 DIGIT + , + 4-5 LETTER WORD
      let indexes: Movement = this.tableTop.getMatrixIndexOfSquare(command.replace(/\ |\,/g,'_'));

      this.placed = this.robot.place(indexes);
      if(!this.placed){
        command += '(invalid)';
      }
    }else if(this.placed && commands[command]){
      switch (commands[command]) {
        case 'MOVE':
          this.robot.move();
          break;
        case 'LEFT':
          this.robot.rotate('LEFT');
          break;
        case 'RIGHT':
          this.robot.rotate('RIGHT');
          break;
        case 'REPORT':
          command = "OUTPUT: " + this.tableTop.squareMatrix[this.robot.y][this.robot.x].x + ", " + this.tableTop.squareMatrix[this.robot.y][this.robot.x].y + ", " + this.robot.direction;
          break;
        default:
          break;
      }
    }else{
      command += '(invalid)';
    }

    this.oldCommands.push(command);
    this.InputForm.reset();
  }

  //todo 

}
