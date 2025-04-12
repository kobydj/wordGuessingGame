export async function fetchRandomWord(difficulty: number = 0): Promise<string> {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const url = `https://api.datamuse.com/words?sp=${randomLetter}*`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      let filtered = [];
      // Filter words that are alphabetic and 4-10 characters long
      if(difficulty == 0){
      filtered = data
        .map((entry: any) => entry.word)
        .filter((word: string) => /^[a-zA-Z]+$/.test(word) && word.length >= 4 && word.length <= 10);
      }else{
        filtered = data
        .map((entry: any) => entry.word)
        .filter((word: string) => /^[a-zA-Z]+$/.test(word) && word.length == difficulty);
      }
  
      if (filtered.length === 0) {
        // Retry with a new letter
        return fetchRandomWord();
      }
  
      // Pick a random word from the list
      return filtered[Math.floor(Math.random() * filtered.length)].toLowerCase();
    } catch (error) {
      console.error('Error fetching word:', error);
      throw new Error('Failed to fetch word from Datamuse API.');
    }
  }