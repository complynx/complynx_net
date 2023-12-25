import { PromisedEventTarget } from "./promised_event_target.js";

export class Pipe extends EventTarget {
    #buffer = [];
    #isClosing = false;
    #isClosed = false;

    constructor(){
        super();
        Object.assign(this, new PromisedEventTarget());
    }

    isClosed(){
        return this.#isClosing;
    }

    async waitClosed() {
        if(this.#isClosing) return;
        return await this.promiseEvent("close");
    }

    close() {
        if(this.#isClosing) return;
        this.#isClosing = true;
        this.dispatchEvent(new Event("close"));
    }

    async write(...data) {
        if(this.#isClosing) {
            throw new Error("pipe is closed");
        }
        this.#buffer.push(...data);
        this.dispatchEvent("hasData");
    }
    async read() {
        while(!this.#isClosed){
            if(this.#buffer.length) {
                let ret = this.#buffer.shift();
                if(this.#isClosing && !this.#buffer.length) {
                    this.#isClosed = true;
                    this.dispatchEvent(new Event("closed"));
                }
                return ret, this.#isClosed;
            }
            await this.promiseEvents("close","closed","hasData");
        }
        return undefined, this.#isClosed;
    }
    async readAll(){
        let ret = []
        let closed = false;
        while(!closed) {
            let data, close = await this.read();
            closed = close;
            ret.push(...data);
        }
        return ret;
    }
}
