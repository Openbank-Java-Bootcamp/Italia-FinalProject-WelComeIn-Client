
function SoundsPage() {
  const [sounds, setSounds] = useState();

  const getAllSounds = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
      .get(`${API_URL}/api/sounds`, {
          headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setSounds(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllSounds();
  }, []);
  return (
    <div>
      <Navbar />
      {sounds.map((sound) => (
        <Link to={`/api/sounds/${id}`}>
          <img src={`${icon}`} />
          <h3>{sound.name}</h3>
        </Link>
          ))}
    </div>
    )
}

export default SoundsPage;
