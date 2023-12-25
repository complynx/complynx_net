export class PromisedEventTarget {
    /**
     * @param {string} type 
     * @returns {Promise<Event>}
     */
    promiseEvent(type) {
        return new Promise(res=>{
            this.addEventListener(type, res, {
                once: true, passive: true
            });
        });
    }
    /**
     * @param  {...string} types 
     * @returns {Promise<Event>}
     */
    promiseEvents(...types) {
        return new Promise(res=>{
            let alreadyResolved = false;
            for(let type of types) {
                this.addEventListener(type, ev=>{
                    if(!alreadyResolved){
                        alreadyResolved = true;
                        res(ev);
                    }
                }, {
                    once: true, passive: true
                });
            }
        });
    }
}

/**
 * @param {Number} msec 
 * @returns {Promise<any>}
 */
export function async_sleep(msec) {
    return new Promise((res, _) => {
        setTimeout(res, msec);
    });
}

/**
 * @param {EventTarget} target 
 * @param {string} type 
 * @returns {Promise<Event>}
 */
export function promiseEvent(target, type) {
    return PromisedEventTarget.prototype.promiseEvent.call(target, type);
}
/**
 * @param {EventTarget} target 
 * @param {...string} types 
 * @returns {Promise<Event>}
 */
export function promiseEvents(target, ...types) {
    return PromisedEventTarget.prototype.promiseEvents.call(target, ...types);
}
