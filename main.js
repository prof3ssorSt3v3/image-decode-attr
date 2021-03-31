document.addEventListener('DOMContentLoaded', () => {
  //when the HTML has finished loading
  console.log('got the HTML');
  let images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.addEventListener('load', (ev) => {
      console.log(`Finished loading the LOW RES ${ev.target.src}`);
      ev.target.setAttribute('data-loaded', 'low');
      //low res versions are:
      //<img loading="lazy" decode="async"/>
      //go decode the real one asynchronously
      //wait for decode() promise to be resolved
      //listen for the load event for the real one
      let i = new Image(); //document.createElement('img')
      i.src = img.src.replace('-low-', '-');
      i.decode().then(() => {
        let url = new URL(i.src);
        console.log(`ASYNC: Finished decoding REAL ${url.pathname}`);
        img.replaceWith(i);
        i.setAttribute('data-loaded', 'high-decoded');
      });

      i.addEventListener('load', (ev) => {
        let url = new URL(ev.target.src);
        ev.target.setAttribute('data-loaded', 'high');
        console.log(`Finished loading REAL ${url.pathname}`);
      });
    });
  });
});

window.addEventListener('load', () => {
  //when the HTML, css, js, fonts,
  //and images that are NOT lazy are finished loading
  console.log('loaded the page and assets, NOT counting lazy images');
});
