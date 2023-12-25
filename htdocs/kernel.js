import { PromisedEventTarget, async_sleep } from "./kmodules/promised_event_target.js";
import { Pipe } from "./kmodules/pipe.js";

class ConsolePipe extends Pipe {
    constructor(){
        super();
    }

    close() {
        throw new Error("this pipe can't be closed");
    }

    async write(...data) {
        console.log(...data);
    }
    async read() {
        throw new Error("this pipe is write only");
    }
    async readAll(){
        throw new Error("this pipe is write only");
    }
}

class INode {
    read=false;
    write=false;
    execute=false;
    data;
    name;
    locks;
}

class Folder extends INode {
    contents = [];
}

class Kernel extends EventTarget {
    constructor(){
        super();
        Object.assign(this, new PromisedEventTarget());
        this.root = new Folder();
    }
    async init(){
        await this.nextTick();
    }
    async sleep(msec){
        return Promise.all([async_sleep(msec), this.nextTick]);
    }
}

class Process extends EventTarget {
    STATE_UNDEFINED = 0;
    STATE_RUNNING = 1;
    STATE_FINISHED_SUCCESSFULLY = 2;
    STATE_FINISHED_ERROR = 3;
    STATE_PAUSED = 4;
    #kernel;
    #env;
    #exe;
    #cwd;
    #args;
    #pipes;
    #state = 0;
    #reason;
    constructor(kernel, exe, env, cwd, args, pipes) {
        super();
        Object.assign(this, new PromisedEventTarget());
        this.#kernel = kernel;
        this.#env = env;
        this.#cwd = cwd;
        this.#args = args;
        this.#exe = exe;
        this.#pipes = pipes;
        this.#kernel.nextTick().then(()=>{
            this.#state = Process.STATE_RUNNING;
            this.dispatchEvent(new Event("started"));
            this.main().then(r=>this._exit_normal(r), e=>this._exit_error(e));
        });
    }
    _exit_common(reason){
        this.#reason = reason;
        this.dispatchEvent(new Event("finished"));
    }
    _exit_normal(reason){
        this.#state = Process.STATE_FINISHED_SUCCESSFULLY;
        this._exit_common(reason);
    }
    _exit_error(reason){
        this.#state = Process.STATE_FINISHED_ERROR;
        this._exit_common(reason);
    }
    getState() {
        return [this.#state, this.#reason];
    }
    async pause() {
        this.#state = Process.STATE_PAUSED;
        this.dispatchEvent(new Event("paused"));
        return await new Promise(res=>{
            this.resume = ()=>{
                if(this.#state == Process.STATE_PAUSED) {
                    this.#state = Process.STATE_RUNNING;
                    this.resume = ()=>{};
                    this.dispatchEvent(new Event("resumed"));
                    res();
                }
            }
        });
    }
    resume() {}
    async main() {}
}

(async function() {
    let kernel = new Kernel();
    let ticks=[];
    let hasTicks = ()=>{};
    kernel.nextTick = function() {
        return new Promise((res, _) => {
            ticks.push(res);
            if(ticks.length == 1) {
                hasTicks(ticks);
            }
        });
    };
    let cycle = 0;
    let cycleDelta = +Infinity;
    kernel.getCycleDelta = function() {
        return cycleDelta;
    }

    await kernel.init();

    while(true) {
        let start = Date.now();
        let tocks = ticks;
        ticks = [];
        while(tocks.length) {
            let task = tocks.shift();
            task(cycle);
        }
        cycle++;
        cycleDelta = Date.now() - start;
        await new Promise((res, _)=>{
            hasTicks = res;
        });
    }
})().then(console.log, console.error);
