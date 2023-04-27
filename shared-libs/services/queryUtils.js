const paginate = async (prismaModel, prismaQuery, pagingParams) => {
    const page = parseInt(pagingParams.page) || 1;
    const pageSize = parseInt(pagingParams.size) || 10;

    const paginatedQuery = {
        ...prismaQuery,
        skip: (page -1) * pageSize,
        take: pageSize
    }

    const [items, totalElements] = await Promise.all([
        prismaModel.findMany(paginatedQuery),
        prismaModel.count(prismaQuery)
    ]);

    return {
        page,
        pageSize,
        totalElements,
        items
    }
}

exports.paginate = paginate;
