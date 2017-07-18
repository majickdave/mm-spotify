module.exports = {
  getLyrics: function(docs){
    var dump = [];
    for (var i = 0; i < docs.length; i++){
      if (docs[i] === null || docs[i].length === 1 || typeof docs[i] === 'string'){
        continue;
      }
      else {
        dump.push(docs[i]);
      }
    }
    return dump;
  },
  getWords: function(docs){
    var dump = [];
    for (var i = 0; i < docs.length; i++){
      if (docs[i] === null || docs[i].length === 1 || typeof docs[i] === 'string'){
        continue;
      }
      else {
        dump.push("Number of words in "+ docs[i][0] + " is " + docs[i][1].replace(/\n/,"").split(" ").length);
      }
    }
    return dump;
  },
  getWordFrequency: function(docs){
    var dump = [];
    for (var i = 0; i < docs.length; i++){
      if (docs[i] === null || docs[i].length === 1 || typeof docs[i] === 'string'){
        continue;
      }
      else {
        var str = docs[i][1].replace(/\n/g,"").split(" ");
        console.log(str);
        var freq = {};
        for (var j = 0; j < str.length; j++){
          if (freq[str[j]]){
            freq[str[j]]++;
          }
          else {
            freq[str[j]] = 1;
          }
        }
        dump.push("Frequency of words in "+ docs[i][0] + " is ", freq);
      }
    }
    return dump;
  },
  getWordsPerDuration: function(docs){
    var dump = [];
    for (var i = 0; i < docs.length; i++){
      if (docs[i]["_id"]["lyrics"] === null || docs[i]["_id"]["lyrics"][0].length === 1 || typeof docs[i]["_id"]["lyrics"][0] === 'string'){
        continue;
      }
      else {
        dump.push("Number of words per track length in "+ docs[i]["_id"]["lyrics"][0][0] + " is " + docs[i]["_id"]["lyrics"][0][1].replace(/\n/,"").split(" ").length/this.millisToMinutesAndSeconds(docs[i]["_id"]["feature"]["duration_ms"]));
      }
    }
    return dump;
  },
  millisToMinutesAndSeconds: function(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return Math.round(Number(minutes + "." + (seconds < 10 ? '0' : '') + seconds));
  }
};
