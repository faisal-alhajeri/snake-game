import './App.css';
import Map from './Map'
import { useState, useEffect, useRef } from 'react';
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

  for(let i =0; i< 15; i++){
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

const putFoodIntoGrid = (grid, food) => {
  grid[food.y][food.x] = 2
}

const createRandomCords = (length) => {
  return {
    x: Math.floor(Math.random() * length),
    y: Math.floor(Math.random() * length)
  }
}

function App() {
  const [snake, setSnake] = useState(() => createStartingSnake())
  const direction = useRef(Directions.RIGHT)
  const [grid, setGrid] = useState(createStartGrid(30))
  const [food, setFood] = useState({x: 20, y: 20});
  const [eated, setEated] = useState(false);
  const speed = 80;

  const setDirection = (d) => direction.current = d

  const createFoodCords = (len) => {
    let cords;
    while(true) {
      cords = createRandomCords(len);
      if (!snake.conflictwith(cords))
        return cords;
    }
  }

  const moveSnake = (dr,inter) => {
    if(!snake.doesCollide()){ 
      const [nextX, nextY] = snake.caculateNextStep(snake.head, dr)
      let foodCords = food;
      // snake will eat
      if (nextX === food.x && nextY === food.y){
        snake.moveStepWithAdd(dr)
        foodCords = createFoodCords(30)
        setFood(foodCords);
        setEated(true);
      } else {
        snake.moveStep(dr)
      }
      setGrid((oldGrid) => {
        let gr = createStartGrid(30);
        putSnakeIntoGrid(gr, snake)
        putFoodIntoGrid(gr, foodCords)
        return gr
      })
    } else{
      clearInterval(inter)
    }
  }

  const handleKeyPress = (e) => {
    console.log(e.code)
    if(!e.repeat){
      switch (e.code){
        case "ArrowUp": 
        case 'KeyW':
          if(direction.current !== Directions.UP && direction.current !== Directions.DOWN)  
            setDirection(Directions.UP);
          break;
        case "ArrowRight":
        case 'KeyD':

          if(direction.current !== Directions.RIGHT && direction.current !== Directions.LEFT){
            setDirection(Directions.RIGHT);
          }  
            
          break;
        case 'ArrowDown':
        case 'KeyS':
          if(direction.current !== Directions.UP && direction.current !== Directions.DOWN)  
            setDirection(Directions.DOWN); 
          break
        case"ArrowLeft":
        case 'KeyA':
          if(direction.current !== Directions.RIGHT && direction.current !== Directions.LEFT)  
            setDirection(Directions.LEFT);
          break;
        default:
          break;
      }
    }
  }
  // add event listener for keys
  useEffect(() => {

    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [])

  //  refresh every s seconds
  useEffect(() => {
      if(eated){
        setEated(false)

      } else {
        moveSnake(direction.current);
        let interval = setInterval(() => {
          moveSnake(direction.current, interval)
        }, speed)
        return () => clearInterval(interval) 
      }

  }, [eated])

  return (
    <>
    <Map grid={grid} /> 
    
    </>
  );
}

export default App;
