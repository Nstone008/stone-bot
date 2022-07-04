// Simple method that returns a random emoji from list
//export function getRandomEmoji() {
const getRandomEmoji = function () {
    const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
    return emojiList[Math.floor(Math.random() * emojiList.length)];
}

const getRandomArbitrary = function (min, max) {
    const result = Math.random() * (max - min) + min;
    return Math.floor(result);
}

module.exports = {
    getRandomEmoji,
    getRandomArbitrary
}