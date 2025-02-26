module.exports = {
    handleInitialValidation: (request, response) => {

        if (request.method !== 'DELETE' && request.headers['Content-Type'] !== 'application/json') {
            throw Error('415 Unsupported Media Type: The request body must be in JSON format.')
        };

        const id = parseInt(request.params.id);
        if(!Number.isInteger(id) || id < 0) {
            throw Error('400 invalid');
        };

        const leadingZeroRegex = /^0\d+/;
        if(leadingZeroRegex.test(request.params.id)) {
            throw Error('400 leading');
        };

        const checkInjectionCommandCharactersRegex = /[^\d]/;
        if(checkInjectionCommandCharactersRegex.test(request.params.id)) {
            throw Error('400 invalid');
        };

        return {valid: true};
    }
};