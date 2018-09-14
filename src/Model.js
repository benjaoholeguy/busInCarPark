/*
* Represents initial data model
* command store a String of the entered command while is entered
* face store a Number. 1: North, 2: East, 3: South, 4: West
* posx stores x coordinate (Number)
* posy stores y coordinate (Number)
* movements is an Array to store all commands
*/
const initModel = {
  command: '',
  face: '',
  posx: '',
  posy:'',
  movements: []
}

export default initModel;
