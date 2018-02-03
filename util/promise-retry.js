class PromiseRetry {

    static callSequential (promise, params, retryCount) {
        if(retryCount) {
            return promise(...params).catch(() => this.call(promise, params, --retryCount));
        }
        return Promise.reject();
    }

    /**
     * This will be a bit faster than previous retry implementation.
     * As this will fire as many request as retryCount all at once and as soon as any of them is resolved,
     * we will respond you a success message. But we are in fact ending up firing multiple request even when
     * the first one itself gets resolved.
     */

    static callParallel (promise, params, retryCount) {

        let isPending = true;
        let retriesLeft = retryCount;

        return new Promise((resolve, reject) => {
            for(let i = 0; i< retryCount; i++) {
                promise(...params).then((response) => {
                    if(isPending) {
                        isPending = false;
                        return resolve(response);
                    }
                }).catch(error => {
                    retriesLeft--;
                    if(!retriesLeft) {
                        reject(error);
                    }
                });
            }
        });

    }

}

module.exports = PromiseRetry;