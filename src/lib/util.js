/**
 * Converts an array of strings or objects to key-text-value triples for a semantic-ui list.
 * @param options - {[String]} or {[Object]}.
 * @param objectKey - If passing an object, use this parameter as the key for the dropdown.
 *                    that'll be used as the key to extract from
 *                    (assuming the objects are single-fielded).
 * @param keyText - Specify a prefix to prepend onto the dropdown's key.
 */
export const createOptions = (options, keyText = '', objectKey) => (
  options.map((o) => {
    let text = '';
    if (typeof o === 'string') {
      text = o;
    } else {
      text = o[objectKey];
    }
    return ({
      key: `${keyText}${text}`,
      text,
      value: text,
    });
  }));