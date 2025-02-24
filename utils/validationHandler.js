module.exports = {
    handleValidation: (request, response) => {

        if (request.headers['Content-Type'] !== 'application/json') {
            return response.status(415).json({
                data: null,
                error: '415 Unsupported Media Type: The request body must be in JSON format.'
            });
        };

        const id = parseInt(request.params.id);
        if(!Number.isInteger(id) || id < 0) {
            return response.status(400).json({
                data: null,
                error: 'Invalid ID. Must be a postitive integer.'
            });
        };

        const leadingZeroRegex = /^0\d+/;
        if(leadingZeroRegex.test(request.params.id)) {
            return response.status(400).json({
                data: null,
                error: 'Invalid ID. Must not have trailing zeros.'
            });
        };

        const checkInjectionCommandCharactersRegex = /[^\d]/;
        if (checkInjectionCommandCharactersRegex.test(request.params.id)) {
            return response.status(400).json({
                data: null,
                error: 'Invalid ID. Must be a positive integer.'
            });
        };
        
        return {valid: true};
    }
};