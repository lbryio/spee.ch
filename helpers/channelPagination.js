const CLAIMS_PER_PAGE = 10;

module.exports = {
  returnPaginatedChannelViewData (channelName, longChannelClaimId, shortChannelClaimId, claims, query) {
    const totalPages = module.exports.determineTotalPages(claims);
    const paginationPage = module.exports.getPageFromQuery(query);
    const viewData = {
      channelName        : channelName,
      longChannelClaimId : longChannelClaimId,
      shortChannelClaimId: shortChannelClaimId,
      claims             : module.exports.extractPageFromClaims(claims, paginationPage),
      previousPage       : module.exports.determinePreviousPage(paginationPage),
      currentPage        : paginationPage,
      nextPage           : module.exports.determineNextPage(totalPages, paginationPage),
      totalPages         : totalPages,
      totalResults       : module.exports.determineTotalClaims(claims),
    };
    return viewData;
  },
  getPageFromQuery (query) {
    if (query.p) {
      return parseInt(query.p);
    }
    return 1;
  },
  extractPageFromClaims (claims, pageNumber) {
    if (!claims) {
      return [];  // if no claims, return this default
    }
    // logger.debug('claims is array?', Array.isArray(claims));
    // logger.debug(`pageNumber ${pageNumber} is number?`, Number.isInteger(pageNumber));
    const claimStartIndex = (pageNumber - 1) * CLAIMS_PER_PAGE;
    const claimEndIndex = claimStartIndex + 10;
    const pageOfClaims = claims.slice(claimStartIndex, claimEndIndex);
    return pageOfClaims;
  },
  determineTotalPages (claims) {
    if (!claims) {
      return 0;
    } else {
      const totalClaims = claims.length;
      if (totalClaims < CLAIMS_PER_PAGE) {
        return 1;
      }
      const fullPages = Math.floor(totalClaims / CLAIMS_PER_PAGE);
      const remainder = totalClaims % CLAIMS_PER_PAGE;
      if (remainder === 0) {
        return fullPages;
      }
      return fullPages + 1;
    }
  },
  determinePreviousPage (currentPage) {
    if (currentPage === 1) {
      return null;
    }
    return currentPage - 1;
  },
  determineNextPage (totalPages, currentPage) {
    if (currentPage === totalPages) {
      return null;
    }
    return currentPage + 1;
  },
  determineTotalClaims (claims) {
    if (!claims) {
      return 0;
    }
    return claims.length;
  },
};
