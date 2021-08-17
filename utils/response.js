/**
 * Standard unicoop service response
 */

class StandardResponse {
  // default not found json response (404)
  static notFoundResponse () {
    const code = 'NOT_FOUND'
    return {
      error: true,
      code: code,
      message: 'service not found',
      data: null
    }
  }

  // error internal server json response (5xx)
  static errorResponse (err) {
    const code = 'INTERNAL_ERROR'
    return {
      error: true,
      code: code,
      message: 'error internal server',
      data: err || null
    }
  }

  /**
   *  invalid request json response (400)
   * @param message
   * @param err
   * @return {{code: string, data: null, error: boolean, message: string}}
   */
  static invalidRequest (message, err) {
    const code = 'INVALID_REQUEST'
    return {
      error: true,
      code: code,
      message: `invalid request ${message}`,
      data: err || null
    }
  }

  /**
   * Generic ok response 200, by default code will be 00 and data is null
   * @param message
   * @param data
   * @param code
   * @param error
   * @return {{code: string, data: null, error: boolean, message: string}}
   */
  static genericResponse ({
    message,
    data,
    code,
    error
  }) {
    return {
      error: error || false,
      code: code || '00',
      message: `${message}`,
      data: data || null
    }
  }
}

module.exports = StandardResponse
