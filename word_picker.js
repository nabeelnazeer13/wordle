function pick_word(word_list, word_length, duplicates_allowed) {
    // Find a random word from list based on the specified word length and whether duplicates are allowed
    const filtered_words = word_list.filter(word => {
        if (word.length !== word_length) return false;
        /*const unique_letters = new Set(word);
        if (!duplicates_allowed && unique_letters.size !== word.length) return false;
        return true;*/
        if (!duplicates_allowed) {
            return new Set(word).size === word.length;
        }
        return true;
    });

    if (filtered_words.length === 0) {
        throw new Error('No words found matching the criteria');
    }

    const random_word_index = Math.floor(Math.random() * filtered_words.length);
    return filtered_words[random_word_index];
}

module.exports = { pick_word };
     


    



    