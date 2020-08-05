class MyArray<T> {
    private data: Array<T>;
    private size: number = 0;

    constructor(capacity = 10) {
        this.data = new Array(capacity)
    }

    public getCapacity(): number {
        return this.data.length
    }

    public getSize(): number {
        return this.size
    }

    public isEmpty(): boolean {
        return this.size === 0
    }

    public push(index: number, e: T): void {
        if (index < 0 || index > this.size) {
            throw new Error('Add failed, Required index >= 0 and index <= size')
        }

        if (this.size === this.data.length) {
            this.resize(2 * this.data.length)
        }

        for (let i = this.size - 1; i >= index; i--) {
            this.data[i + 1] = this.data[i]
        }
        this.data[index] = e;
        this.size ++
    }

    public resize(newCapacity: number): void {
        let newData = new Array(newCapacity)
        for (let i = 0; i <= this.size; i++) {
            newData[i] = this.data[i]
        } 
        this.data = newData
    }

    public addLast(e: T): void {
        this.push(this.size, e)
    }

    public addFrist(e: T): void {
        this.push(0, e)
    }

    public getLast(): T {
        return this.data[this.size - 1]
    }

    public getFrist(): T {
        return this.data[0]
    }

    public get(index: number): T {
        if (index < 0 || index > this.size) {
            throw new Error('Get failed. Index is illegal.')
        }
        return this.data[index]
    }

    public set(index: number, e: T):void {
        if (index < 0 || index > this.size) {
            throw new Error('Get failed. Index is illegal.')
        }
        this.data[index] = e
    }

    public contains(e: T): boolean {
        for (let i = 0; i < this.size; i++ ) {
            if (this.data[i] === e) {
                return true
            }
        }
        return false
    }

    public find(e: T): number {
        for (let i = 0; i < this.size; i++ ) {
            if (this.data[i] === e) {
                return i
            }
        }
        return -1
    }

    public remove(index: number): T {
        if (index < 0 || index > this.size) {
            throw new Error('remove failed, Required index >= 0 and index <= size')
        }
        const e = this.data[index]
        for (let i = index + 1; i < this.size; i++) {
            this.data[i - 1] = this.data[i]
        }
        this.size--
        this.data[this.size] = undefined;
        if (this.size === this.data.length / 4 && this.data.length / 2 !== 0) {
            this.resize(this.data.length / 2);
        }
        return e
    }

    public removeFirst(): T {
        return this.remove(0);
    }

    public removeLast(): T {
        return this.remove(this.size - 1);
    }

    public print(): void {
        let str = ``;
        str += `Array: size = ${this.size}, capacity = ${this.data.length}\n`;
        str += '[';
        for (let i = 0; i < this.size; i++) {
            str += this.data[i];
            if (i !== this.size - 1) {
                str += ', ';
            }
        }
        str += ']';
        console.log(str);
    }
}

const arr = new MyArray(10)
arr.addFrist('123')
arr.addFrist('123')
arr.print()

export default MyArray;
