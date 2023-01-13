import Navbar from "./Navbar";
import { useState } from "react";
import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Typical from "react-typical";
function Home() {
  const [allnews, setAllnews] = useState([]);
  const apiKey = "b221713eca334697b6114f7519b5e62c";
  let searchKeyword;
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b221713eca334697b6114f7519b5e62c`;

  const fetchnews = async () => {
    try {
      let response = await fetch(url);
      const data = await response.json();
      setAllnews(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    searchKeyword = event.target[0].value;
    url = `https://newsapi.org/v2/everything?q=${searchKeyword}&from=2022-12-07&sortBy=publishedAt&apiKey=${apiKey}`;
    console.log("url is", url);
    fetchnews();
  };

  fetchnews();
  return (
    <>
      <Navbar />
      <Container fluid>
        <Row>
          <div className="search-row">
            <form onSubmit={handleSubmit} className="form-css">
              <div className="text-center welcm-text">
                <h4>
                  Welcome to{" "}
                  <Typical
                    steps={["OneNewsApp", 1000, "Best News", 1000]}
                    loop={Infinity}
                    wrapper="p"
                  />
                </h4>
              </div>
              <div className="input-group">
                <input
                  className="form-control border-secondary py-2"
                  type="search"
                  name="searchValue"
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Row>
        <Row className="news-row">
          <CardGroup className="pb-5 d-flex justify-content-center news-tray">
            {allnews.length > 0 ? (
              allnews.map((data) => {
                return (
                  <Col className="pt-3">
                    <Card style={{ width: "15rem" }}>
                      <Card.Img src={data.urlToImage} />
                      <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                          {/* {data.description.substring(0, 100)} */}
                        </Card.Text>
                        <a href={data.url}>Read more....</a>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col className="pt-3">
                <Card style={{ width: "15rem" }}>
                  <Card.Img src="https://upload.wikimedia.org/wikipedia/en/0/04/Freddie_the_Bengal_Cat.jpg" />
                  <Card.Body>
                    <Card.Title>Sorry the news is not available</Card.Title>
                    <Card.Text>Trying searching for some other news</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </CardGroup>
        </Row>
      </Container>
    </>
  );
}

export default Home;
