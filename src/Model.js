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
  commands: [],
  error: '',
  report: '',
  carpark: [
    {id: 1, cel1: '', cel2: '', cel3: '', cel4: '', cel5: ''},
    {id: 2, cel1: '', cel2: '', cel3: '', cel4: '', cel5: ''},
    {id: 3, cel1: '', cel2: '', cel3: '', cel4: '', cel5: ''},
    {id: 4, cel1: '', cel2: '', cel3: '', cel4: '', cel5: ''},
    {id: 5, cel1: '', cel2: '', cel3: '', cel4: '', cel5: ''}
  ]
}

export default initModel;
