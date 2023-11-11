const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/

class Parser {
  parse(lyric) {
    let results = [];
    if (!lyric) return results;
    try {
      lyric = lyric.lrc.lyric.split('\n');
      for (const row of lyric) {
        const result = timeExp.exec(row);
        if (!result) continue;
        const data = row.replace(result[0], '')
        let timeoffset = parseInt(result[1]) * 60 * 1000
        timeoffset += parseInt(result[2]) * 1000
        timeoffset += parseInt(result[3].slice(0, 2)) * 10
        results.push({
          timeoffset,
          data
        })
      }
      return results
    } catch (error) {
      return []
    }
  }
}


const p = new Parser();
export default p;