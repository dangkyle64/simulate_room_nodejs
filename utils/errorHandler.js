module.exports = {
    handleError: (error, response) => {

        if(error.message.includes('Invalid Type. Must be a valid string.')) {
            return response.status(400).json({
                data: null,
                error: 'Invalid Type. Must be a valid string.'
            });
        };

        if(error.message.includes('Invalid modelUrl. Must be a valid url.')) {
            return response.status(400).json({
                data: null,
                error: 'Invalid modelUrl. Must be a valid url.'
            });
        };

        if(error.message.includes('Invalid length. Must be a positive integer.')) {
            return response.status(400).json({
                data: null,
                error: 'Invalid length. Must be a positive integer.'
            });
        };

        if(error.message.includes('Invalid width. Must be a positive integer.')) {
            return response.status(400).json({
                data: null,
                error: 'Invalid width. Must be a positive integer.'
            });
        };

        if(error.message.includes('Invalid height. Must be a positive integer.')) {
            return response.status(400).json({
                data: null,
                error: 'Invalid height. Must be a positive integer.'
            });
        };

        if (error.message.includes('400 invalid')) {
            return response.status(400).json({
                data: null,
                error: `Invalid ID. Must be a positive integer.`
            });
        };

        if (error.message.includes('400 leading')) {
            return response.status(400).json({
                data: null,
                error: `Invalid ID. Must not have trailing zeros.`
            });
        };

        if (error.message.includes('400 Type')) {
            return response.status(400).json({
                data: null,
                error: `Invalid type update. Must be a string.`
            });
        };

        if (error.message.includes('Furniture not found')) {
            return response.status(404).json({
                data: null,
                error: `Furniture with that ID not found.`
            });
        };

        if (error.message.includes('Room not found')) {
            return response.status(404).json({
                data: null,
                error: `Room with that ID not found.`
            });
        };

        if (error.message.includes('415 Unsupported Media Type')) {
            return response.status(415).json({
                data: null,
                error: `415 Unsupported Media Type: The request body must be in JSON format.`
            });
        };

        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            return response.status(500).json({ 
                data: [], 
                error: 'Internal Server Error: External service timeout' 
            });
        };

        if (error.message.includes('too many clients already')) {
            return response.status(500).json({ 
                data: [], 
                error: 'too many clients already' 
            });
        };
        return response.status(500).json({ 
            data: [], 
            error: 'Internal Server Error: Error fetching data' 
        });
    }
};