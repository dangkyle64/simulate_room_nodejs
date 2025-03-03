module.exports = {
    handleFurniturePOSTValidation: (request, response) => {

        if(typeof request.body.type !== 'string' || !request.body.type || request.body.type.trim() === '') {
            throw Error('Invalid Type. Must be a valid string.')
        };

        const validURLRegex = /^(https?|ftp):\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i;
        if(typeof request.body.modelUrl !== 'string' || !request.body.modelUrl || !validURLRegex.test(request.body.modelUrl)) {
            throw Error('Invalid modelUrl. Must be a valid url.')
        };

        if(!request.body.length || !Number.isInteger(request.body.length) || request.body.length < 0) {
            throw Error('Invalid length. Must be a positive integer.')
        };

        if(!request.body.width || !Number.isInteger(request.body.width) || request.body.width < 0) {
            throw Error('Invalid width. Must be a positive integer.')
        };

        if(!request.body.height || !Number.isInteger(request.body.height) || request.body.height < 0) {
            throw Error('Invalid height. Must be a positive integer.')
        };

        return {valid: true};
    },
    handleFurniturePUTValidation: (request, response) => {

        if(typeof request.body.type !== 'string') {
            throw Error('Invalid Type. Must be a valid string.');
        };

        const validURLRegex = /^(https?|ftp):\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i;
        if(typeof request.body.modelUrl !== 'string' || !validURLRegex.test(request.body.modelUrl)) {
            throw Error('Invalid modelUrl. Must be a valid url.');
        };

        if(!Number.isInteger(request.body.length) || request.body.length < 0) {
            throw Error('Invalid length. Must be a positive integer.');
        };

        if(!Number.isInteger(request.body.width) || request.body.width < 0) {
            throw Error('Invalid width. Must be a positive integer.');
        };

        if(!Number.isInteger(request.body.height) || request.body.height < 0) {
            throw Error('Invalid height. Must be a positive integer.');
        };

        return {valid: true};
    },
};