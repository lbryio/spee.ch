const CLAIMS_PER_PAGE = 12;

module.exports = {
  returnPaginatedChannelClaims (channelName, longChannelClaimId, claims, page) {
    const totalPages = module.exports.determineTotalPages(claims);
    const paginationPage = module.exports.getPageFromQuery(page);
    const viewData = {
      channelName       : channelName,
      longChannelClaimId: longChannelClaimId,
      claims            : module.exports.extractPageFromClaims(claims, paginationPage),
      previousPage      : module.exports.determinePreviousPage(paginationPage),
      currentPage       : paginationPage,
      nextPage          : module.exports.determineNextPage(totalPages, paginationPage),
      totalPages        : totalPages,
      totalResults      : module.exports.determineTotalClaims(claims),
    };
    return viewData;
  },
  getPageFromQuery (page) {
    if (page) {
      return parseInt(page);
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
    const claimEndIndex = claimStartIndex + CLAIMS_PER_PAGE;
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
