import React, { useState } from "react";

const TweetComponent = ({ weatherData, theme }) => {
  const [tweetMessage, setTweetMessage] = useState("");

  const handleTweet = () => {
    const tweetContent = `Current weather in ${weatherData.name}: ${weatherData.main.temp}°${weatherData.units === 'metric' ? 'C' : 'F'}, ${weatherData.weather[0].description}. ${tweetMessage}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className={`flex flex-col items-center justify-center my-4 mt-5 w-full p-6 rounded-xl space-y-4 ${theme === "light" ? "bg-blue-100 bg-opacity-10" : "bg-gray-700"}`}>
      <h2 className="text-2xl font-bold text-indigo-300">{`Plan something fun with your friends in this ${weatherData.weather[0].description}!`}</h2>
      <input
      
        type="text"
        value={tweetMessage}
        onChange={(e) => setTweetMessage(e.target.value)}
        placeholder="What's your plan for today?"
        className={`w-full p-2 rounded-lg ${theme === "light" ? "bg-gray-200 text-gray-900 placeholder-gray-600" : "bg-gray-700 text-white placeholder-gray-400"}`}
      />
      
      <button
        onClick={handleTweet}
        className="rounded-2xl border-2 border-dashed border-gray-600 bg-transparent px-4 py-2 font-semibold uppercase text-gray-600 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
        Share on X
      </button>
    </div>
  );
};

export default TweetComponent;
