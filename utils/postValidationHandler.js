module.exports = {
    handlePOSTValidation: (request, response) => {

        if(typeof request.body.type !== 'string' || !request.body.type || request.body.type.trim() === '') {
            return response.status(400).json({
                data: null,
                error: 'Invalid Type. Must be a valid string.'
            });
        };

        const validURLRegex = /^(https?|ftp):\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/i;
        if(typeof request.body.modelUrl !== 'string' || !request.body.type || !validURLRegex.test(request.body.modelUrl)) {
            return response.status(400).json({
                data: null,
                error: 'Invalid modelUrl. Must be a valid url.'
            });
        };

        if(!request.body.modelUrl || !Number.isInteger(request.body.length) || request.body.length < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid length. Must be a positive integer.'
            });
        };

        if(!request.body.modelUrl || !Number.isInteger(request.body.width) || request.body.width < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid width. Must be a positive integer.'
            });
        };

        if(!request.body.modelUrl || !Number.isInteger(request.body.height) || request.body.height < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid height. Must be a positive integer.'
            });
        };

        return {valid: true};
    }
};