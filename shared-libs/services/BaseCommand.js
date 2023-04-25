class BaseCommand {
    constructor(cmdCtx) {
        this.cmdCtx = cmdCtx ?? {};
        this.cmdCtx.isFailed = false;
        this.cmdCtx.errors = this.cmdCtx.errors ?? [];
    }

    async execute() {
        try {
            await this.validate();
            await this.doExecute();
            return this.cmdCtx;
        } catch (e) {
            if (e instanceof CommandError) {
                return this.cmdCtx;
            } else {
                // not our error, rethrowing it
                throw e;
            }
        }
    }

    async doExecute() {}

    async validate() {}

    isFailed() {
        return this.cmdCtx.isFailed;
    }

    fail(errors) {
        this.cmdCtx.isFailed = true;
        this.cmdCtx.errors.push(...errors);
        throw new CommandError(
            'command failed, this error should be caught'
        );
    }
}

class CommandError extends Error {

}

module.exports = BaseCommand;
