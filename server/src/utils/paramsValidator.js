export const validateQueryFields = (req) => {
    let page = parseInt(req?.query?.page) || 1;
    let pageSize = parseInt(req?.query.pageSize) || 10;
    let search = req?.query?.search || null;
    let level = req?.query?.level || null;
    return { page, pageSize, search, level }
};
