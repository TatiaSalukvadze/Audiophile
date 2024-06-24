import "./gallery.css";
// import ReactFancyBox from "react-fancybox";
// import "react-fancybox/lib/fancybox.css";
import Fancybox from "./Fancybox";
function Gallery({ p, imageSrcKey }) {
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
            href={p.gallery.first[imageSrcKey]}
            className="pg1"
            title="Click to Open Picture"
          >
            <img src={p.gallery.first[imageSrcKey]} alt="" />
          </a>
          <a
            data-fancybox="gallery"
            href={p.gallery.second[imageSrcKey]}
            className="pg2"
            title="Click to Open Picture"
          >
            <img src={p.gallery.second[imageSrcKey]} alt="" />
          </a>
        </div>
        <a
          data-fancybox="gallery"
          href={p.gallery.third[imageSrcKey]}
          className="pg3"
          title="Click to Open Picture"
        >
          <img src={p.gallery.third[imageSrcKey]} alt="" />
        </a>

        {/* <div id="inner">
        <img src={p.gallery.first[imageSrcKey]} alt="" className="pg1" />
        <img src={p.gallery.second[imageSrcKey]} alt="" className="pg2" />
      </div>
      <img src={p.gallery.third[imageSrcKey]} alt="" className="pg3" /> */}
      </div>
    </Fancybox>
  );
}

export default Gallery;
