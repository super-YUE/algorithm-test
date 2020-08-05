import MyArray from '../array/index'

interface Stack<E> {
	getSize(): number;
	isEmpty(): boolean;
	push(e: E): void;
	pop(): E;
	peek(): E;
}

class ArrayStack<E> implements Stack<E> {
	private array: MyArray<E>;

	constructor(capacity: number = 10) {
		this.array = new MyArray<E>(capacity);
	}

	public getSize(): number {
        return this.array.getSize();
	}
	
	public isEmpty(): boolean {
        return this.array.isEmpty();
	}
	
	public getCapacity(): number {
        return this.array.getCapacity();
	}
	
	public push(e: E): void {
        this.array.addLast(e);
	}
	
	public pop(): E {
        return this.array.removeLast();
	}
	
	public peek(): E {
        return this.array.getLast();
	}
	
	public toString(): void {
        let res = '';
        res += `Stack: size = ${this.getSize()}, capacity = ${this.getCapacity()}\n`;
        res += '[';
        for (let i = 0; i < this.array.getSize(); i++) {
            res += this.array.get(i);
            if (i !== this.array.getSize() - 1) {
                res += ', ';
            }
        }
        res += ']';
    }
}

export default ArrayStack;
