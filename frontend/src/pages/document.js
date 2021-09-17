import { useState, useEffect } from "react";
import "./document.css";
import Pagination from "@material-ui/lab/Pagination";
import {
  Box,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const DocumentComponent = ({ match }) => {
  const pageNumber = 2 || 1;
  const matches = useMediaQuery("(max-width:500px)");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [length, setLength] = useState(10);

  const handleChange = (event) => {
    setLength(event.target.value);
  };

  useEffect(() => {
    const fecthPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:2000/api/v1/documents?page=${page}&limit=${length}`
        );

        const { data, pages: totalPages } = await res.json();

        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some Error Occured");
      }
    };

    fecthPosts();
  }, [page,length]);

  return (
    <div className="doc">
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <h1 style={matches ? { fontSize: 24 } : { fontSize: 34 }}>
            Mern Backend Pagination
          </h1>
        </Grid>
        <Grid item item xs={12}>
          <Pagination
            size={matches ? "small" : "large"}
            className="paginationContainer"
            color="primary"
            count={pages}
            onChange={(object, currentPage) => setPage(currentPage)}
          />
        </Grid>
        <Grid item item xs={12}>
          {loading ? (
            <div className="loaderContainer">
              <h3 style={{ margin: "20px" }}>Loading</h3>
              <div className="progress-box">
                <CircularProgress color="secondary" />
              </div>
            </div>
          ) : error ? (
            <div className="errorContainer">
              <h3>{error}</h3>
            </div>
          ) : (
            <Grid container>
              <Grid item xs={12} sm={1} spacing={2}>
                


              <FormControl fullWidth>
  <InputLabel
   id="demo-simple-select-label">Docs</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={length}
    label="Docs"
    onChange={handleChange}
  >
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={20}>20</MenuItem>
    <MenuItem value={30}>30</MenuItem>
    <MenuItem value={40}>40</MenuItem>
    <MenuItem value={50}>50</MenuItem>
  </Select>
</FormControl>







              </Grid>
              <Grid item xs={12} sm={11}>
                <Grid container spacing={2}>
                  {posts &&
                    posts.map((item, k) => (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={2} style={{ height: "100%" }}>
                          <Box style={{ padding: "10px" }}>
                            <h4>{item.title}</h4>
                            <p>{item.author}</p>
                            <p>{item.body}</p>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentComponent;
