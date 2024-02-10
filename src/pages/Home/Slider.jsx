import "./Home.scss";
import banner2 from "../../assets/slider/banner2.jpg";
import banner3 from "../../assets/slider/banner3.jpg";
import banner4 from "../../assets/slider/banner4.jpg";
import banner5 from "../../assets/slider/banner5.jpg";

const Slider = () => {
  return (
    <div
      style={{
        height: "450px",
        overflow: "hidden",
      }}
      id="carouselExampleDark"
      className="carousel slide"
    >
      <div className="carousel-indicators">
        <li
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <li
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <li
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
        <li
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to={3}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval={10000}>
          <img src={banner2} className="d-block w-100" alt="..." />
          <div className="overlay"></div>
        </div>
        <div className="carousel-item" data-bs-interval={2000}>
          <img src={banner3} className="d-block w-100" alt="..." />
          <div className="overlay"></div>
        </div>
        <div className="carousel-item" data-bs-interval={3000}>
          <img src={banner4} className="d-block w-100" alt="..." />
          <div className="overlay"></div>
        </div>
        <div className="carousel-item" data-bs-interval={4000}>
          <img src={banner5} className="d-block w-100" alt="..." />
          <div className="overlay"></div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
