function VideosPage() {
  const [videos, setVideos] = useState();

  const getAllVideos = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
      .get(`${API_URL}/api/videos`, {
          headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setVideos(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllVideos();
  }, []);
  return (
    <div>
      <Navbar />
      {videos.map((video) => (
        <Link to={`/api/videos/${id}`}>
          <img src={`${icon}`} />
          <h3>{video.name}</h3>
        </Link>
          ))}
    </div>
    )
}

export default VideosPage;