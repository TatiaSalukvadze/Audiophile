import "./gallery.css";

function Gallery({ p, imageSrcKey }) {
  return (
    <div className="gallery mainwrap">
      <div id="inner">
        <img src={p.gallery.first[imageSrcKey]} alt="" className="pg1" />
        <img src={p.gallery.second[imageSrcKey]} alt="" className="pg2" />
      </div>

      <img src={p.gallery.third[imageSrcKey]} alt="" className="pg3" />
    </div>
  );
}

export default Gallery;
