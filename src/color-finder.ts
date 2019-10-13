/**
 * @export
 * @param {string} txt
 * @returns {{
 *  start:  ,
 *  end: number,
 *  color: string
 * }}
 */
export async function findFromRGBO(txt: string) {
    const regEx = /Color\.fromRGBO\((\d+, \d+, \d+, \d+\.\d+)\)/g;
    let result = [];

    let match;

    while (match = regEx.exec(txt)) {
        const start = match.index;
        const end = start + match[0].length;
        const color = match[1];

        result.push({
            start,
            end,
            color
        });
    }

    return result;
}