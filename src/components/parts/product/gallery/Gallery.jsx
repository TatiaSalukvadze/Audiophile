import "./gallery.css";
import Fancybox from "./Fancybox";

function Gallery({ p }) {
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <div className="gallery mainwrap">
        <div id="inner">
          <a
            data-fancybox="gallery"
            href={p.gallery.first.desktop}
            className="pg1"
            title="Click to Open Picture"
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={p.gallery.first.tablet}
              />
              <source
                media="(max-width: 476px)"
                srcSet={p.gallery.first.mobile}
              />
              <img
                src={p.gallery.first.desktop}
                alt="product"
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="500"
              />
            </picture>

            {/* <img src={p.gallery.first.mobile} alt="" /> */}
          </a>
          <a
            data-fancybox="gallery"
            href={p.gallery.second.desktop}
            className="pg2"
            title="Click to Open Picture"
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={p.gallery.second.tablet}
              />
              <source
                media="(max-width: 476px)"
                srcSet={p.gallery.second.mobile}
              />
              <img
                src={p.gallery.second.desktop}
                alt="product"
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="500"
              />
            </picture>

            {/* <img src={p.gallery.second.mobile} alt="" /> */}
          </a>
        </div>
        <a
          data-fancybox="gallery"
          href={p.gallery.third.desktop}
          className="pg3"
          title="Click to Open Picture"
        >
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={p.gallery.third.tablet}
            />
            <source
              media="(max-width: 476px)"
              srcSet={p.gallery.third.mobile}
            />
            <img
              src={p.gallery.third.desktop}
              alt="product"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="500"
            />
          </picture>

          {/* <img src={p.gallery.third.mobile} alt="" /> */}
        </a>
      </div>
    </Fancybox>
  );
}

export default Gallery;
