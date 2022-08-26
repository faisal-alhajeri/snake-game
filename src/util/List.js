export const Directions = {
    UP: 'up',
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left'
}

export class snakeNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
        this.isHead = false;
    }
}

export class List {
    constructor(length){
        this.head = null;
        this.tail = null;
        this.prevTail = null;
        this.length = length;
    }

    add(node){
        if (!this.head || !this.tail){
            this.head = node;
            this.tail = node;
            this.prevTail = node;
        }
        else{
            this.tail.next = node;
            this.prevTail = this.tail
            this.tail = node; 
        }

    }

    helper(node, newX, newY){
        let oldX = node.x;
        let oldY = node.y;
        node.x = newX;
        node.y = newY;

        if(!node.next)
            return [oldX, oldY]
        else
            return this.helper(node.next, oldX, oldY);
    }

    caculateNextStep(node, direction){
        let oldX = node.x;
        let oldY = node.y;
        let newX = oldX, newY = oldY;
        switch (direction) {
            case Directions.UP:
                newY = (oldY-1)%this.length;
                break;
            case Directions.RIGHT:
                newX = (oldX + 1)%this.length;
                break;
            case Directions.DOWN:
                newY = (oldY + 1)% this.length;
                break;
            case Directions.LEFT:
                newX = (oldX -1)%this.length;
                break;                                             
            default:
        }
        newX = newX<0? newX+this.length: newX;
        newY = newY<0? newY+this.length: newY;
        return [newX, newY];
        
    }
    moveStep(direction){
        let [newX, newY] = this.caculateNextStep(this.head, direction);
        // console.log(newX, newY);
        let oldX = this.head.x;
        let oldY = this.head.y;
        this.head.x = newX;
        this.head.y = newY;
        // console.log(this.head.x, this.head.y);
        this.helper(this.head.next, oldX, oldY);      
    }

    moveStepWithAdd(direction){
        let [newX, newY] = this.caculateNextStep(this.head, direction);
        let oldX = this.head.x;
        let oldY = this.head.y;
        this.head.x = newX;
        this.head.y = newY;
        let [addX, addY] = this.helper(this.head.next, oldX, oldY);
        
        const nodeToAdd = new snakeNode(addX, addY);
        this.add(nodeToAdd);
    }

    doesCollide(){
        const [headX, headY] = [this.head.x, this.head.y];
        let current = this.head.next;
        while (current) {
            if(headX === current.x && headY === current.y){
                console.log("died");
                return true;
            }
            current = current.next;
        }
        return false;
    }

    conflictwith(codrs){
        let current = this.head;
        while(current){
            if(current.x === codrs.x && current.y === codrs.y)
                return true;
            current = current.next;
        }
        return false;
    }


    printSnake(){
        let current = this.head;
        while(current){
            console.log(current.x, current.y);
            current = current.next
        }
    }
}