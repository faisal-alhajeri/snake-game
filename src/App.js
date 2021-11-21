import './App.css';
import Map from './Map'
import { useState, useEffect } from 'react';
import { Directions, List, snakeNode } from './util/List';

const createStartGrid = (length) => {
  const startGrid = [];
  for (let i = 0; i < length; i++) {
    startGrid.push(Array(length).fill(0))
  }
  return startGrid;
}

const createStartingSnake = () => {
  let X = 10;
  let Y = 3;
  const snake = new List(30);

  let node = new snakeNode(X, Y);
  snake.add(node)

  for(let i =0; i< 6; i++){
    node = new snakeNode(--X, Y);
    snake.add(node);
  }

  return snake;
}

const putSnakeIntoGrid = (grid,snake) => {
  let node = snake.head;
  while(node){
    grid[node.y][node.x] = 1;
    node = node.next;
  }
}

function App() {
  const [snake, setSnake] = useState(() => createStartingSnake())
  const [direction, setDirection] = useState(() => Directions.RIGHT);
  const [grid, setGrid] = useState(createStartGrid(30))
  const speed = 100;
  const moveSnake = (dr) => {
    snake.moveStep(dr)
    setGrid((oldGrid) => {
      let gr = createStartGrid(30);
      putSnakeIntoGrid(gr, snake)
      return gr
    })
  }

  const handleKeyPress = (e) => {
    if(!e.repeat){
      switch (e.code){
        case 'KeyW':
          if(direction !== Directions.UP && direction !== Directions.DOWN)  
            setDirection(Directions.UP);
          break;
        case 'KeyD':

          if(direction !== Directions.RIGHT && direction !== Directions.LEFT){
            setDirection(Directions.RIGHT);
          }  
            
          break;
        case 'KeyS':
          if(direction !== Directions.UP && direction !== Directions.DOWN)  
            setDirection(Directions.DOWN); 
          break
        case 'KeyA':
          if(direction !== Directions.RIGHT && direction !== Directions.LEFT)  
            setDirection(Directions.LEFT);
          break;
        default:
          break;
      }
    }
  }
  // add event listener for keys
  useEffect(() => {
    console.log(direction);

    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [direction])

  //  refresh every s seconds
  useEffect(() => {
    let interval = setInterval(moveSnake, speed, direction)

    return () => clearInterval(interval) 
  }, [direction])


  // (for test only) move with move only
  // useEffect(() => {
  //   setSnake((oldSnake) => {
  //     oldSnake.moveStep(direction)
  //     return oldSnake
  // })  }, [direction])
  

  // make snake changes
  // useEffect(() => {

  // }, [snake])

  // snake.printSnake()

  return (
    <>
    <Map grid={grid} /> 
    {direction}
    </>
  );
}

export default App;
