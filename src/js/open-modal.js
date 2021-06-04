import 'basiclightbox/dist/basicLightbox.min.css'
import * as basicLightbox from 'basiclightbox'

const onOpenBigImage = e => {
    e.preventDefault();

    if (e.currentTarget === e.target) {
        return;
    }

    const bigImageSrc = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${bigImageSrc}" width="800" height="600">
`);
    instance.show();
};

export default onOpenBigImage;