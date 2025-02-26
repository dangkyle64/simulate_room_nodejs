module.exports = {
    handleRoomPOSTValidation: (request, response) => {

        if(!request.body.length || !Number.isInteger(request.body.length) || request.body.length < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid length. Must be a positive integer.'
            });
        };

        if(!request.body.width || !Number.isInteger(request.body.width) || request.body.width < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid width. Must be a positive integer.'
            });
        };

        if(!request.body.height || !Number.isInteger(request.body.height) || request.body.height < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid height. Must be a positive integer.'
            });
        };

        return {valid: true};
    },
    handleRoomPUTValidation: (request, response) => {

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
    },
};