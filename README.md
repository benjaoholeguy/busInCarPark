# busInCarPark

Operating Instructions
- git clone https://github.com/benjaoholeguy/busInCarPark.git
- cd your_path/busInCarPark
- npm install & npm start

Tech Stack
- node
- npm
- ramda
- hyperscript-helpers
- virtual-dom
- tachyons

Examples to test the application:
a)
- PLACE 0,0,NORTH
- MOVE
- REPORT
- Output: 0,1,NORTH
b)
- PLACE 0,0,NORTH
- LEFT
- REPORT
- Output: 0,0,WEST
c)
- PLACE 1,2,EAST
- MOVE
- MOVE
- LEFT
- MOVE
- REPORT
- Output: 3,3,NORTH
