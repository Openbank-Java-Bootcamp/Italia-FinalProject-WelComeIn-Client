function ImagesPage() {
  const [images, setImages] = useState();

  const getAllImages = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
      .get(`${API_URL}/api/images`, {
          headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setImages(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <div>
      <Navbar />
      {images.map((image) => (
        <Link to={`/api/images/${id}`}>
          <img src={`${icon}`} />
          <h3>{image.name}</h3>
        </Link>
          ))}
    </div>
    )
  }
  
  export default ImagesPage;