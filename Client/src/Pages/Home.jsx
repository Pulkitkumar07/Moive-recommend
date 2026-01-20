import { useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: nanoid(),
          userPrompt: data.prompt
        })
      });

      const result = await res.json();

      
      let moviesArray = [];
      try {
        moviesArray = JSON.parse(result.data)?.movies || [];
      } catch (e) {
        console.error("Failed to parse movies JSON", e);
        moviesArray = [];
      }

      setMovies(moviesArray);
      reset();
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">
        AI Movie Recommendation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

   
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Describe Your Mood</h2>

          <textarea
            className="w-full h-40 p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Example: romantic Bollywood movies, sci-fi thriller..."
            {...register("prompt", { required: true, minLength: 5 })}
          />

          {errors.prompt && <p className="text-red-400 mt-2 text-sm">Please enter at least 5 characters</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Get Recommendations"}
          </button>
        </form>


        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>

          {loading && <p className="text-gray-400">Fetching recommendations...</p>}

          {!loading && movies.length > 0 ? (
            <div className="space-y-3">
              {movies.map((movie, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  <span className="font-semibold text-lg">{movie.title}</span>
                  <span className="mt-1 md:mt-0 px-3 py-1 text-sm font-medium bg-purple-600 text-white rounded-full">
                    {movie.platform}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="text-gray-500">Movies will appear here...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
