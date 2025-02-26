module.exports = {
    handlePUTValidation: (request, response) => {

        if(typeof request.body.type !== 'string') {
            throw Error('400 Type Update');
        };

        const validURLRegex = /^(https?|ftp):\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i;
        if(typeof request.body.modelUrl !== 'string' || !validURLRegex.test(request.body.modelUrl)) {
            throw Error('400 ModelUrl Update');
        };

        if(!Number.isInteger(request.body.length) || request.body.length < 0) {
            throw Error('400 Length Update');
        };

        if(!Number.isInteger(request.body.width) || request.body.width < 0) {
            throw Error('400 Width Update');
        };

        if(!Number.isInteger(request.body.height) || request.body.height < 0) {
            throw Error('400 Height Update');
        };

        return {valid: true};
    }
};