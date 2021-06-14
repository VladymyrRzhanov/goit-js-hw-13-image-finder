import refs from "./refs";

const getScroll = () => {
   if (document.documentElement.scrollTop) {
       refs.scrollToTop.classList.add('scroll-show')
   } else {
       refs.scrollToTop.classList.remove('scroll-show')
   }
}

const onScrollTop = () => {
    window.scrollTo(pageYOffset, 0);
}

export {onScrollTop,getScroll}