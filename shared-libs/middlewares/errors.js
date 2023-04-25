exports.errors = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e.name === 'NotFoundError') {
            ctx.status = 404;
            // TODO add error messages
        } else {
            ctx.status = 500;
            console.error(e.message, e.stack);
        }
    }
};
