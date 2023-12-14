"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidate = void 0;
const revalidate = async (args) => {
    const { collection, payload, slug } = args;
    try {
        const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`);
        if (res.ok) {
            payload.logger.info(`Revalidated page '${slug}' in collection '${collection}'`);
        }
        else {
            payload.logger.error({ res }, `Error revalidating page '${slug}' in collection '${collection}'`);
        }
    }
    catch (err) {
        payload.logger.error({ err }, `Error hitting revalidate route for page '${slug}' in collection '${collection}'`);
    }
};
exports.revalidate = revalidate;
